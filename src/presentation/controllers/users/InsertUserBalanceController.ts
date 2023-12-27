import {
  badRequest,
  ok,
  serverError,
} from '@/presentation/helpers/http/HttpHelpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  InsertUserBalance,
  Validation,
} from './UsersProtocols';

export class InsertUserBalanceController implements Controller {
  constructor(
    private readonly insertUserBalance: InsertUserBalance,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const checkErrorValidation = this.validation.validate(httpRequest.body);
      if (checkErrorValidation) {
        return badRequest(checkErrorValidation);
      }

      const insertBalance = await this.insertUserBalance.deposit({
        id: httpRequest.headers.userId,
        amount: httpRequest.body.amount,
      });

      return ok({ insertBalance });
    } catch (error) {
      return serverError(error);
    }
  }
}
