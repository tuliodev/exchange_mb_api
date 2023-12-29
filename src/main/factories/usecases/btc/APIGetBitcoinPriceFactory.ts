import { APIGetBitcoinPrice } from '@/data/usecases/api/APIGetBitcoinPrice';
import { GetBitcoinPrice } from '@/domain/usecases/btc/GetBitcoinPrice';
import { GetMercadoBitcoinPrice } from '@/infra/api/GetMercadoBitcoinPrice';

export const makeAPIGetBitcoinPrice = (): GetBitcoinPrice => {
  const apiInstance = new GetMercadoBitcoinPrice();

  return new APIGetBitcoinPrice(apiInstance);
};
