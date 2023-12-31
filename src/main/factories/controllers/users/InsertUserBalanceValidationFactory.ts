import {
  RequiredFieldPositive,
  ValidationComposite,
} from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols';

export const makeInsertUserBalanceValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['amount']) {
    validations.push(new RequiredFieldPositive(field));
  }

  return new ValidationComposite(validations);
};
