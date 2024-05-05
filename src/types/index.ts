export interface IPairItem {
  old: TSettings
  new: TSettings
  timestamp: Date
}

export type TSettings = 'BTCUSDT' | 'BNBBTC' | 'ETHBTC'
