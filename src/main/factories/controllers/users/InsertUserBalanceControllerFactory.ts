import { Controller } from '../../../../presentation/protocols/controller';
import { InsertUserBalanceController } from '@/presentation/controllers/users/InsertUserBalanceController';
import { makeInsertUserBalance } from '../../usecases/users/DbInsertUserBalanceFactory';
import { makeInsertUserBalanceValidation } from './InsertUserBalanceValidationFactory';

export const makeInsertUserBalanceController = (): Controller => {
  return new InsertUserBalanceController(
    makeInsertUserBalance(),
    makeInsertUserBalanceValidation(),
  );
};
