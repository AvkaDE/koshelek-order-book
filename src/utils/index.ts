import type { IConvertedOrders, IDepthResponse } from '@/types'

export const convertArray = (arr: string[][]) =>
  arr
    .map((x) => {
      return {
        price: x[0],
        quantity: x[1],
        total: Number(x[0]) * Number(x[1])
      }
    })
    .filter((x) => +x.quantity > 0)

export const convertResponse = (response: IDepthResponse): IConvertedOrders => {
  const asks = convertArray(response.asks)
  const bids = convertArray(response.bids)

  return {
    asks,
    bids
  }
}
