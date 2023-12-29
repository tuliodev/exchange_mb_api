export interface Address {
  name: string;
  email: string;
}

export interface MessageModel {
  to: Address;
  from: Address;
  subject: string;
  body?: string;
  template?: string;
  context?: any;
}

export interface SendMail {
  sendMail(message: MessageModel): Promise<void>;
}
