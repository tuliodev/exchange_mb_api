import { GetBitcoinPriceResult } from '@/domain/models/Bitcoin';
import { GetBitcoinPrice } from '@/domain/usecases/btc/GetBitcoinPrice';
import axiosInstance from '@/main/config/axios';

export class GetMercadoBitcoinPrice implements GetBitcoinPrice {
  async getPrice(): Promise<GetBitcoinPriceResult> {
    try {
      const { data } = await axiosInstance.get('/BTC/ticker/');

      return {
        buy: data.ticker.buy,
        sell: data.ticker.sell,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
