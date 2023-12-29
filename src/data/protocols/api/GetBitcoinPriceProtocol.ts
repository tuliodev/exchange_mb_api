import { GetBitcoinPriceResult } from '@/domain/models/Bitcoin';

export interface GetBitcoinPriceProtocol {
  getPrice(): Promise<GetBitcoinPriceResult>;
}
