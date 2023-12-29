export interface Ticker {
  high: string;
  low: string;
  vol: string;
  last: string;
  buy: string;
  sell: string;
  open: string;
  date: number;
}

export interface Bitcoin {
  ticker: Ticker;
}

export interface GetBitcoinPriceResult {
  buy: string;
  sell: string;
}
