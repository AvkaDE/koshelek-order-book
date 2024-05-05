import { fetchDepth } from '@/api'
import type { IPairItem, TSettings } from '@/types'
import { defineStore } from 'pinia'

type IRootStore = {
  selectedPair: TSettings
  changelog: IPairItem[]
}

export const useRootStore = defineStore('rootStore', {
  state: () =>
    <IRootStore>{
      selectedPair: 'BTCUSDT',
      changelog: []
    },
  actions: {
    async changePair(newPair: TSettings, oldPair: TSettings) {
      this.selectedPair = newPair

      const newItem = {
        old: oldPair,
        new: newPair,
        timestamp: new Date()
      }

      this.changelog.push(newItem)

      const res = await fetchDepth(newPair)
      console.log(res)

      await this.subcribeToUpdates(newPair)
    },
    async subcribeToUpdates(tickerName: string) {}
  }
})
