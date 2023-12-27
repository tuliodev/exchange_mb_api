import {
  InsertUserBalance,
  InsertUserBalanceModel,
  InsertUserBalanceRepository,
  LoadUserByIdRepository,
  User,
} from './UserProtocols';

export class DbInsertUserBalance implements InsertUserBalance {
  constructor(
    private readonly insertUserBalanceRepository: InsertUserBalanceRepository,
    private readonly loadUserById: LoadUserByIdRepository,
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

    return updatedUser;
  }
}
