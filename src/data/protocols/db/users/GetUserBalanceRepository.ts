import {
  GetUserBalanceModel,
  GetUserBalanceResult,
} from '@/domain/usecases/users/GetUserBalance';

export interface GetUserBalanceRepository {
  getBalanceById(data: GetUserBalanceModel): Promise<GetUserBalanceResult>;
}
