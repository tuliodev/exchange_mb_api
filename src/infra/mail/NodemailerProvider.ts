import nodemailer from 'nodemailer';
import Mail, { Options } from 'nodemailer/lib/mailer';
import { resolve } from 'path';
import { create } from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { SendMail, MessageModel } from '@/domain/usecases/mail/SendMail';

interface ExtendedOptions extends Options {
  subject: string;
  body?: string;
  template?: string;
  context?: Record<string, unknown>;
}

export class MailNodemailerProvider implements SendMail {
  private readonly transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io', // troubles with sendgrid and mandrill for have a lot of emails on the same ip
      port: 2525,
      auth: {
        user: '92b9b4e0d55531',
        pass: '4ddb137286caad',
      },
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(
      __dirname,
      '..',
      '..',
      'presentation',
      'views',
      'emails',
    );

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: create({
          layoutsDir: resolve(viewPath),
          extname: '.hbs',
          defaultLayout: 'depositedSuccess',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );
  }

  async sendMail(message: MessageModel): Promise<void> {
    try {
      const options: ExtendedOptions = {
        to: {
          name: message.to.name,
          address: message.to.email,
        },
        from: {
          name: message.from.name,
          address: message.from.email,
        },
        subject: message.subject,
        template: message.template,
        context: message.context,
      };

      const transporterRes = await this.transporter.sendMail(options);
      console.log('Email sended with success', transporterRes);
    } catch (error) {
      console.log(error);
    }
  }
}
