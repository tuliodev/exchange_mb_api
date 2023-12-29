/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateUserModel,
  CreateUserRepository,
  DbCreateUser,
  Hasher,
  LoadUserByEmailRepository,
  User,
} from './UserProtocols';

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_password'));
    }
  }

  return new HasherStub();
};

const makeCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(userData: CreateUserModel): Promise<User> {
      return await new Promise((resolve) => resolve(makeFakeUser()));
    }
  }

  return new CreateUserRepositoryStub();
};

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail(email: string): Promise<User> {
      return await new Promise((resolve) => resolve(null));
    }
  }
  return new LoadUserByEmailRepositoryStub();
};

const makeFakeUser = (): User => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  balance: 200,
});

const makeFakeUserData = (): CreateUserModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

interface SubTypes {
  sut: DbCreateUser;
  hasherStub: Hasher;
  addAccountRepositoryStub;
  loadAccountByEmailRepositoryStub: LoadUserByEmailRepository;
}

const makeSut = (): SubTypes => {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeCreateUserRepository();
  const loadAccountByEmailRepositoryStub = makeLoadUserByEmailRepository();
  const sut = new DbCreateUser(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbCreateUser Usercase', () => {
  test('Should call encrypter with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const encryptSpy = jest.spyOn(hasherStub, 'hash');
    await sut.create(makeFakeUserData());
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.create(makeFakeUserData());
    await expect(promise).rejects.toThrow();
  });

  test('Should call CreateUserRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'create');
    await sut.create(makeFakeUserData());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.create(makeFakeUserData());
    await expect(promise).rejects.toThrow();
  });

  test('Should return an user on success', async () => {
    const { sut } = makeSut();
    const account = await sut.create(makeFakeUserData());
    await expect(account).toEqual(makeFakeUser());
  });

  test('Should return null if LoadUserByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeUser())));
    const account = await sut.create(makeFakeUserData());
    await expect(account).toBe(null);
  });

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.create(makeFakeUserData());
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
