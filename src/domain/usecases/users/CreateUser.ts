import { User } from '../../models/User';

export interface CreateUserModel {
  name: string;
  email: string;
  password: string;
  balance?: number;
}

export interface CreateUser {
  create(userData: CreateUserModel): Promise<User>;
}
