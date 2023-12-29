import { GetBitcoinPriceResult } from '@/domain/models/Bitcoin';

export interface GetBitcoinPrice {
  getPrice(): Promise<GetBitcoinPriceResult>;
}
