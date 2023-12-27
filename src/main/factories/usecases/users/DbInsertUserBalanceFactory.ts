import { UsersRepository } from '@/infra/db/typeorm/repositories/UsersRepository';
import { InsertUserBalance } from '@/domain/usecases/users/InsertUserBalance';
import { DbInsertUserBalance } from '@/data/usecases/users/DbInsertUserBalance';

export const makeInsertUserBalance = (): InsertUserBalance => {
  const usersRepository = new UsersRepository();
  return new DbInsertUserBalance(usersRepository, usersRepository);
};
