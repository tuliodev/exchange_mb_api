import { CreateUserController } from '../../../../presentation/controllers/users/CreateUserController';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeCreateUserValidation } from './CreateUserValidationFactory';
import { makeDbCreateUser } from '../../usecases/users/DbCreateUserFactory';

export const makeCreateUserController = (): Controller => {
  return new CreateUserController(
    makeDbCreateUser(),
    makeCreateUserValidation(),
  );
};
