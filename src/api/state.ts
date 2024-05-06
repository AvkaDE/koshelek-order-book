import type { IWebsocketMessage, TOrderMap } from '@/types'
import { reactive } from 'vue'

export const state = reactive<{
  socket: null | WebSocket
  snapshotLoaded: boolean
  buffer: IWebsocketMessage[]
  result: { asks: TOrderMap; bids: TOrderMap }
  lastUpdateId: number
}>({
  socket: null,
  snapshotLoaded: false,
  buffer: [],
  result: {
    asks: new Map(),
    bids: new Map()
  },
  lastUpdateId: 0
})
