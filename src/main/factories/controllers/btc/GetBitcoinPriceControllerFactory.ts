import { GetBitcoinPriceController } from '@/presentation/controllers/btc/GetBitcoinPriceController';
import { Controller } from '@/presentation/protocols';
import { makeAPIGetBitcoinPrice } from '../../usecases/btc/APIGetBitcoinPriceFactory';

export const makeGetBitcoinPriceController = (): Controller => {
  return new GetBitcoinPriceController(makeAPIGetBitcoinPrice());
};
