import {
  InsertUserBalance,
  InsertUserBalanceModel,
  InsertUserBalanceRepository,
  LoadUserByIdRepository,
  SendMail,
  User,
} from './UserProtocols';

export class DbInsertUserBalance implements InsertUserBalance {
  constructor(
    private readonly insertUserBalanceRepository: InsertUserBalanceRepository,
    private readonly loadUserById: LoadUserByIdRepository,
    private readonly mailService: SendMail,
  ) {}

  async deposit(data: InsertUserBalanceModel): Promise<User> {
    const user = await this.loadUserById.loadById(data.id);

    if (!user) {
      return null;
    }

    const updatedUser = await this.insertUserBalanceRepository.deposit({
      id: data.id,
      amount: data.amount,
    });

    this.mailService.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: 'Tulio',
        email: 'info@mailtrap.io',
      },
      subject: 'Deposito feito com sucesso',
      template: 'depositedSuccess',
      context: {
        amount: data.amount,
        name: user.name,
      },
    });

    return updatedUser;
  }
}
