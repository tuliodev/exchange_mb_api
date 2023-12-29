export interface GetUserBalanceModel {
  id: string;
}

export interface GetUserBalanceResult {
  balance: number;
}

export interface GetUserBalance {
  getBalanceById(data: GetUserBalanceModel): Promise<GetUserBalanceResult>;
}
