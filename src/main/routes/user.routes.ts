import { Router } from 'express';
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter';

import { makeCreateUserController } from '../factories/controllers/users/CreateUserControllerFactory';

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()));
};
