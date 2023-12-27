import { User } from '@/domain/models/User';

export interface LoadUserById {
  loadById(userId: string): Promise<User>;
}
