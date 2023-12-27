import env from '@/main/config/env';
import { JwtAdapter } from '@/infra/criptography/jwtAdapter/JwtAdapter';
import { AuthMiddleware } from '@/presentation/middlewares/AuthMiddleware';
import { Middleware } from '@/presentation/protocols';
import { makeDbLoadUserById } from '../usecases/users/DbLoadUserByIdFactory';

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);

  return new AuthMiddleware(makeDbLoadUserById(), jwtAdapter);
};
