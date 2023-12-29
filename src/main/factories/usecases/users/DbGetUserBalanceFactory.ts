import { DbGetUserBalance } from '@/data/usecases/users/DbGetUserBalance';
import { GetUserBalance } from '@/domain/usecases/users/GetUserBalance';
import { UsersRepository } from '@/infra/db/typeorm/repositories/UsersRepository';

export const makeGetUserBalance = (): GetUserBalance => {
  const usersRepository = new UsersRepository();
  return new DbGetUserBalance(usersRepository, usersRepository);
};
