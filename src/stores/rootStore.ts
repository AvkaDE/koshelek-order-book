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
    }
  }
})
