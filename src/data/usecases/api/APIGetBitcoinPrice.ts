import {
  GetBitcoinPrice,
  GetBitcoinPriceProtocol,
  GetBitcoinPriceResult,
} from './ApiProtocols';

export class APIGetBitcoinPrice implements GetBitcoinPrice {
  constructor(private readonly getBtcPrice: GetBitcoinPriceProtocol) {}

  async getPrice(): Promise<GetBitcoinPriceResult> {
    const result = await this.getBtcPrice.getPrice();

    return result;
  }
}
