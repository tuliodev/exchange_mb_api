import { GetUserBalanceRepository } from '@/data/protocols/db/users/GetUserBalanceRepository';
import {
  GetUserBalance,
  GetUserBalanceModel,
  GetUserBalanceResult,
  LoadUserByIdRepository,
} from './UserProtocols';

export class DbGetUserBalance implements GetUserBalance {
  constructor(
    private readonly getUserBalanceRepository: GetUserBalanceRepository,
    private readonly loadUserById: LoadUserByIdRepository,
  ) {}

  async getBalanceById(
    data: GetUserBalanceModel,
  ): Promise<GetUserBalanceResult> {
    const user = await this.loadUserById.loadById(data.id);

    if (!user) {
      return null;
    }

    const userBalance = await this.getUserBalanceRepository.getBalanceById({
      id: data.id,
    });

    return userBalance;
  }
}
