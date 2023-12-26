import { LoadUserByEmail } from '@/domain/usecases/users/LoadUserByEmail';
import { LoadUserByEmailRepository, User } from './UserProtocols';

export class DbLoadUserByEmail implements LoadUserByEmail {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async loadByEmail(email: string): Promise<User> {
    const user = await this.loadUserByEmailRepository.loadByEmail(email);
    if (user) {
      return user;
    }

    return null;
  }
}
