import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRootStore = defineStore('rootStore', () => {
  const selectedPair = ref('BTCUSDT')

  async function changePair(newPair: string) {
    selectedPair.value = newPair

    await subcribeToUpdates(newPair)
  }

  async function subcribeToUpdates(tickerName: string) {}

  return { selectedPair, changePair }
})
