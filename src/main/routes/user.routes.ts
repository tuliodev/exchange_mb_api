import { Router } from 'express';
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter';

import { makeCreateUserController } from '../factories/controllers/users/CreateUserControllerFactory';
import { makeInsertUserBalanceController } from '../factories/controllers/users/InsertUserBalanceControllerFactory';
import { adaptMiddleware } from '../adapters/express/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory';

export default (router: Router): void => {
  const authMiddleware = adaptMiddleware(makeAuthMiddleware());
  router.post('/users', adaptRoute(makeCreateUserController()));

  router.post(
    '/users/deposit',
    authMiddleware,
    adaptRoute(makeInsertUserBalanceController()),
  );
};
