import type { IDepthResponse } from '@/types'

const API_URL = 'https://api.binance.com/api/v3/'

export function fetchDepth(tickerName: string): Promise<IDepthResponse> {
  return fetch(API_URL + `depth?symbol=${tickerName}`).then((x) => x.json())
}

// const state = {
//   isSnapshoatloaded: false,
//   bufferArr: [],
//   resultArr: []
// }

//connect to socket
// state.bufferArr.push(1,2,3); // push new data from socket

// const snapshatArr = await fetchDepth('bnbbtc');

// state.resultArr = [...snapshatArr, state.bufferArr.filter((x) => x <= snapshatArr.lastUpdateId)]

// isloaded = true
