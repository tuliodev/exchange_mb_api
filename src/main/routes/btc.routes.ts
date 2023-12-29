import { Router } from 'express';
import { adaptMiddleware } from '../adapters/express/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory';
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter';
import { makeGetBitcoinPriceController } from '../factories/controllers/btc/GetBitcoinPriceControllerFactory';

export default (router: Router): void => {
  const authMiddleware = adaptMiddleware(makeAuthMiddleware());

  router.get(
    '/btc/price',
    authMiddleware,
    adaptRoute(makeGetBitcoinPriceController()),
  );
};
