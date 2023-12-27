import {
  HttpRequest,
  HttpResponse,
  Middleware,
  LoadUserById,
} from './AuthMiddlewareProtocols';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/HttpHelpers';
import { Decrypter } from '@/data/protocols/criptography/Decrypter';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadUserById: LoadUserById,
    private readonly jwtDecrypt: Decrypter,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authHeader = httpRequest.headers?.authorization;
      if (authHeader) {
        const [, accessToken] = authHeader.split(' ');
        if (!accessToken) {
          return forbidden(new AccessDeniedError());
        }
        const { id, role } = await this.jwtDecrypt.decrypt(accessToken);
        const user = await this.loadUserById.loadById(id);
        if (user) {
          httpRequest.headers.userId = user.id;
          httpRequest.headers.userRole = role;
          return ok({ user: user.id });
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
