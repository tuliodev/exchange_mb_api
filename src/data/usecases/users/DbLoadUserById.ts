import { User, LoadUserById, LoadUserByIdRepository } from './UserProtocols';

export class DbLoadUserById implements LoadUserById {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async loadById(userId: string): Promise<User> {
    const user = await this.loadUserByIdRepository.loadById(userId);
    if (user) {
      return user;
    }

    return null;
  }
}
