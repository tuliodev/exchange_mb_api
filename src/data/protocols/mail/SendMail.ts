import { MessageModel } from '@/domain/usecases/mail/SendMail';

export interface SendMail {
  sendMail(message: MessageModel): Promise<void>;
}
