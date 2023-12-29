import { ok, serverError } from '@/presentation/helpers/http/HttpHelpers';
import {
  Controller,
  GetBitcoinPrice,
  HttpRequest,
  HttpResponse,
} from './BitcoinProtocols';

export class GetBitcoinPriceController implements Controller {
  constructor(private readonly getBtcPrice: GetBitcoinPrice) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const price = await this.getBtcPrice.getPrice();

      return ok({ price });
    } catch (error) {
      return serverError(error);
    }
  }
}
