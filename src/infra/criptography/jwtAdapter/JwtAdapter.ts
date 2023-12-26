import jwt from 'jsonwebtoken';
import {
  Decrypter,
  DecryptResult,
} from '../../../data/protocols/criptography/Decrypter';
import {
  EncryptData,
  Encrypter,
} from '../../../data/protocols/criptography/Encrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(encryptData: EncryptData): Promise<string> {
    const accessToken = await jwt.sign(
      {
        id: encryptData.id,
        name: encryptData.name,
        role: encryptData.role,
      },
      this.secret,
    );

    return accessToken;
  }

  async decrypt(token: string): Promise<DecryptResult> {
    const value: any = await jwt.verify(token, this.secret);
    return value;
  }
}
