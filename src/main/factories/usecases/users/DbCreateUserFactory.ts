import { DbCreateUser } from '@/data/usecases/users/DbCreateUser';
import { BcryptAdapter } from '@/infra/criptography/bcryptAdapter/BcryptAdapter';
import { UsersRepository } from '@/infra/db/typeorm/repositories/UsersRepository';
import { CreateUser } from '@/domain/usecases/users/CreateUser';

export const makeDbCreateUser = (): CreateUser => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const usersRepository = new UsersRepository();

  return new DbCreateUser(bcryptAdapter, usersRepository, usersRepository);
};
