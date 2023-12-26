import { User } from '../../../../domain/models/User';
import { CreateUserModel } from '../../../../domain/usecases/users/CreateUser';

export interface CreateUserRepository {
  create(userData: CreateUserModel): Promise<User>;
}
