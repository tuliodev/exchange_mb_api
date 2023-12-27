import { User } from '../../models/User';

export interface InsertUserBalanceModel {
  id: string;
  amount: number;
}

export interface InsertUserBalance {
  deposit(data: InsertUserBalanceModel): Promise<User>;
}
