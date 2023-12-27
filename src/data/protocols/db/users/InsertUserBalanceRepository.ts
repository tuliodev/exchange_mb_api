import { InsertUserBalanceModel } from '@/domain/usecases/users/InsertUserBalance';
import { User } from '../../../../domain/models/User';

export interface InsertUserBalanceRepository {
  deposit(data: InsertUserBalanceModel): Promise<User>;
}
