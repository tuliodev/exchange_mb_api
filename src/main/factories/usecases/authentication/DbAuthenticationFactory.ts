import env from '../../../config/env';
import { BcryptAdapter } from '@/infra/criptography/bcryptAdapter/BcryptAdapter';
import { JwtAdapter } from '@/infra/criptography/jwtAdapter/JwtAdapter';
import { UsersRepository } from '@/infra/db/typeorm/repositories/UsersRepository';
import { DbAuthentication } from '@/data/usecases/authentication/DbAuthentication';
import { Authentication } from '@/domain/usecases/users/Authentication';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const userRepository = new UsersRepository();
  return new DbAuthentication(userRepository, bcryptAdapter, jwtAdapter);
};
