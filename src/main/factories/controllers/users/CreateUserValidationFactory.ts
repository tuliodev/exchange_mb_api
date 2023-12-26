import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

export const makeCreateUserValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['name', 'email']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
