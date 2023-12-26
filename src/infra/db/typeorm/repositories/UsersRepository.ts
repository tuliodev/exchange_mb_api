import { getRepository, Repository } from 'typeorm';

import UserEntity from '../entities/User';

import { User } from '@/domain/models/User';
import { CreateUserModel } from '@/domain/usecases/users/CreateUser';

import { LoadUserByEmailRepository } from '@/data/protocols/db/users/LoadUserByEmailRepository';
import { CreateUserRepository } from '@/data/usecases/users/UserProtocols';

export class UsersRepository
  implements CreateUserRepository, LoadUserByEmailRepository
{
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }

  public async create(userData: CreateUserModel): Promise<User> {
    const user = await this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    if (!user) {
      return null;
    }

    return user;
  }

  public async loadByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }
}
