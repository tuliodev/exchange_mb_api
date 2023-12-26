import { EmailInUseError } from '../../errors';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '../../helpers/http/HttpHelpers';
import {
  Controller,
  CreateUser,
  HttpRequest,
  HttpResponse,
  Validation,
} from './UsersProtocols';

export class CreateUserController implements Controller {
  constructor(
    private readonly createUser: CreateUser,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const checkErrorValidation = this.validation.validate(httpRequest.body);
      if (checkErrorValidation) {
        return badRequest(checkErrorValidation);
      }
      const user = await this.createUser.create(httpRequest.body);
      if (!user) {
        return forbidden(new EmailInUseError());
      }
      delete user.password;

      return ok({ user });
    } catch (error) {
      return serverError(error);
    }
  }
}
