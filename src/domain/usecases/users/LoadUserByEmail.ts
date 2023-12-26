import { User } from '../../models/User';

export interface LoadUserByEmail {
  loadByEmail(email: string): Promise<User>;
}
