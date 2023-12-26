export interface DecryptResult {
  id: string;
  name: string;
  role: string;
}

export interface Decrypter {
  decrypt(value: string): Promise<DecryptResult>;
}
