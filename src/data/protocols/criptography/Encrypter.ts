export interface EncryptData {
  id: string;
  name: string;
  role?: string;
}

export interface Encrypter {
  encrypt(value: EncryptData): Promise<string>;
}
