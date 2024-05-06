import type { IWebsocketMessage, TOrderUpdateItem } from '@/types'
import { fetchDepth } from '@/api'
import { state } from '@/api/state'

const WS_URL = 'wss://stream.binance.com:9443/ws/'

export const socketConnection = async (tickername: string) => {
  if (state.snapshotLoaded === true) return

  const socket = new WebSocket(WS_URL + tickername.toLowerCase() + '@depth')

  socket.onmessage = function (e) {
    const jsonData: IWebsocketMessage = JSON.parse(e.data)

    if (!state.snapshotLoaded) {
      state.buffer.push(jsonData)
    } else {
      if (jsonData.u <= state.lastUpdateId) return

      updateOrders('asks', jsonData.a)
      updateOrders('bids', jsonData.b)

      state.lastUpdateId = jsonData.u
    }
  }

  socket.onclose = function () {
    state.snapshotLoaded = false
  }

  state.socket = socket
}

const updateOrders = (orderType: 'asks' | 'bids', items: TOrderUpdateItem[]) => {
  for (const item of items) {
    const [price, quantity] = item

    if (state.result[orderType].has(price)) {
      if (Number(quantity) === 0) {
        state.result[orderType].delete(price)
      } else {
        state.result[orderType].set(price, quantity)
      }
    } else if (Number(quantity) !== 0) {
      state.result[orderType].set(price, quantity)
    }
  }
}

export const syncSnapshot = async (tickername: string) => {
  if (state.snapshotLoaded) return

  const snapshot = await fetchDepth(tickername)

  const finalSnapshotUpdateId = snapshot.lastUpdateId

  const getBufferEventsAfterSnapshot = (
    orderType: keyof Pick<IWebsocketMessage, 'a' | 'b'>,
    buffer: IWebsocketMessage[]
  ) => {
    return buffer
      .filter((x) => x.u > finalSnapshotUpdateId)
      .sort((a, b) => a.u - b.u)
      .map((x) => x[orderType])
      .reduce((prev, cur) => prev.concat(cur), [])
  }

  const resultAsks = [...snapshot.asks, ...getBufferEventsAfterSnapshot('a', state.buffer)]
  const resultBids = [...snapshot.bids, ...getBufferEventsAfterSnapshot('b', state.buffer)]

  updateOrders('asks', resultAsks)
  updateOrders('bids', resultBids)

  if (state.buffer.length) {
    state.lastUpdateId = state.buffer[state.buffer.length - 1].u
  } else {
    state.lastUpdateId = snapshot.lastUpdateId
  }
  state.snapshotLoaded = true
}
