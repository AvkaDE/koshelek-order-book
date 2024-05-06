import { reactive } from 'vue'
import { fetchDepth } from '.'
import { convertArray, convertResponse } from '@/utils'
import type { IOrderItem } from '@/types'

export const state = reactive({
  snapshotLoaded: false,
  result: {
    asks: <IOrderItem[]>[],
    bids: <IOrderItem[]>[]
  },
  lastEventId: 0
})

const URL = 'wss://stream.binance.com:9443/ws/'

export const socket = async (tickername: string) => {
  const localSocket = new WebSocket(URL + tickername.toLowerCase() + '@depth')

  localSocket.onmessage = function (e) {
    const jsonData = JSON.parse(e.data)
    if (jsonData.u <= state.lastEventId) return

    if (jsonData.U <= state.lastEventId + 1 && jsonData.u >= state.lastEventId + 1) {
      state.result.asks.push(...convertArray(jsonData.a))
      state.result.bids.push(...convertArray(jsonData.b))

      state.lastEventId = jsonData.u
    }
  }

  const snapshot = await fetchDepth(tickername)
  state.lastEventId = snapshot.lastUpdateId

  const converted = convertResponse(snapshot)

  state.result.asks = converted.asks
  state.result.bids = converted.bids
}
