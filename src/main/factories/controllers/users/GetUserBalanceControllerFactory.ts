import { GetUserBalanceController } from '@/presentation/controllers/users/GetUserBalanceController';
import { Controller } from '@/presentation/protocols';
import { makeGetUserBalance } from '../../usecases/users/DbGetUserBalanceFactory';

export const makeGetUserBalanceController = (): Controller => {
  return new GetUserBalanceController(makeGetUserBalance());
};
