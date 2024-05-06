import type { TOrderMap } from '@/types'

export const transformOrdersMapToArray = (map: TOrderMap) => {
  return Array.from(map.entries()).map((x) => {
    return {
      price: Number(x[0]).toFixed(2),
      quantity: Number(x[1]).toFixed(5),
      total: Number(x[0]) * Number(x[1])
    }
  })
}
