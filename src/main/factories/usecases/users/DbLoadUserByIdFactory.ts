import { DbLoadUserById } from '@/data/usecases/users/DbLoadUserById';
import { UsersRepository } from '@/infra/db/typeorm/repositories/UsersRepository';
import { LoadUserById } from '@/domain/usecases/users/LoadUserById';

export const makeDbLoadUserById = (): LoadUserById => {
  const usersRepository = new UsersRepository();
  return new DbLoadUserById(usersRepository);
};
