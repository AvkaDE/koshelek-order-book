export interface IPairItem {
  old: TSettings
  new: TSettings
  timestamp: Date
}

export type TSettings = 'BTCUSDT' | 'BNBBTC' | 'ETHBTC'

export type TOrderMap = Map<string, string>

export type TOrderUpdateItem = [string, string]

export interface IDepthResponse {
  asks: TOrderUpdateItem[]
  bids: TOrderUpdateItem[]
  lastUpdateId: number
}

export interface IWebsocketMessage {
  e: 'depthUpdate' // Event type
  E: number // Event time
  s: string // Symbol
  U: number // First update ID in event
  u: number // Final update ID in event
  b: TOrderUpdateItem[] // Bids to be updated,
  a: TOrderUpdateItem[] // Asks to be updated
}

export interface IOrderItem {
  price: string
  quantity: string
  total: number
}

// export interface IState
