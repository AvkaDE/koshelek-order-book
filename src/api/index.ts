const API_URL = 'https://api.binance.com/api/v3/'

export function fetchDepth(tickerName: string) {
  return fetch(API_URL + `depth?symbol=${tickerName}`).then((x) => x.json())
}
