import { ok, serverError } from '@/presentation/helpers/http/HttpHelpers';
import {
  Controller,
  GetUserBalance,
  HttpRequest,
  HttpResponse,
} from './UsersProtocols';

export class GetUserBalanceController implements Controller {
  constructor(private readonly getUserBalance: GetUserBalance) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const getBalance = await this.getUserBalance.getBalanceById({
        id: httpRequest.headers.userId,
      });

      return ok({ balance: getBalance.balance });
    } catch (error) {
      return serverError(error);
    }
  }
}
