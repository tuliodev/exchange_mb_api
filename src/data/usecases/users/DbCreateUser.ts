import {
  CreateUser,
  CreateUserModel,
  User,
  CreateUserRepository,
  Hasher,
  LoadUserByEmailRepository,
} from './UserProtocols';

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async create(userData: CreateUserModel): Promise<User> {
    const userExist = await this.loadUserByEmailRepository.loadByEmail(
      userData.email,
    );
    if (userExist) {
      return null;
    }
    const hashedPassword = await this.hasher.hash(userData.password);
    const user = await this.createUserRepository.create(
      Object.assign({}, userData, { password: hashedPassword }),
    );

    return user;
  }
}
