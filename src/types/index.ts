export interface IPairItem {
  old: TSettings
  new: TSettings
  timestamp: Date
}

export type TSettings = 'BTCUSDT' | 'BNBBTC' | 'ETHBTC'

export interface IOrderItem {
  price: string
  quantity: string
  total: number
}

export interface IDepthResponse {
  asks: string[][]
  bids: string[][]
  lastUpdateId: number
}

export interface IConvertedOrders {
  asks: IOrderItem[]
  bids: IOrderItem[]
}
