import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadUserByEmailRepository,
} from './DbAuthenticationProtocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadUserByEmailRepository.loadByEmail(
      authentication.email,
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password,
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt({
          id: account.id,
          name: account.name,
        });

        return accessToken;
      }
    }

    return null;
  }
}
