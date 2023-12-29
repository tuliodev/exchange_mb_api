import { UsersRepository } from '@/infra/db/typeorm/repositories/UsersRepository';
import { InsertUserBalance } from '@/domain/usecases/users/InsertUserBalance';
import { DbInsertUserBalance } from '@/data/usecases/users/DbInsertUserBalance';
import { MailNodemailerProvider } from '@/infra/mail/NodemailerProvider';

export const makeInsertUserBalance = (): InsertUserBalance => {
  const usersRepository = new UsersRepository();
  const nodeMailerProvider = new MailNodemailerProvider();
  return new DbInsertUserBalance(
    usersRepository,
    usersRepository,
    nodeMailerProvider,
  );
};
