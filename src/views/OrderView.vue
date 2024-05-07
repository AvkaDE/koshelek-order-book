<template>
  <v-container fluid>
    <v-row>
      <v-col md="3">
        Текущая выбранная валютная пара: <b>{{ rootStore.selectedPair }}</b>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6"> ASKS: </v-col>
      <v-col md="6"> BIDS: </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-data-table
          :headers="headers"
          :fixed-header="true"
          :items="asks"
          :items-per-page="100"
          :items-per-page-options="[100, 500, 1000]"
          height="70vh"
        >
          <template v-slot:[`item.price`]="{ value }">
            <span class="ask">
              {{ value }}
            </span>
          </template>
        </v-data-table>
      </v-col>
      <v-col md="6">
        <v-data-table
          :headers="headers"
          :fixed-header="true"
          :items="bids"
          :items-per-page="100"
          :items-per-page-options="[100, 500, 1000]"
          height="70vh"
        >
          <template v-slot:[`item.price`]="{ value }">
            <span class="bid">
              {{ value }}
            </span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { socketConnection, syncSnapshot } from '@/api/socket'
import { state } from '@/api/state'
import { useRootStore } from '@/stores/rootStore'
import { transformOrdersMapToArray } from '@/utils'
import type { IOrderItem } from '@/types'
import { useDisplay } from 'vuetify'

export default defineComponent({
  name: 'OrderView',
  setup() {
    const rootStore = useRootStore()

    const asks = computed(() =>
      transformOrdersMapToArray(state.result.asks).sort((a, b) => +a.price - +b.price)
    )
    const bids = computed(() =>
      transformOrdersMapToArray(state.result.bids).sort((a, b) => +b.price - +a.price)
    )

    const display = useDisplay()

    const headers = computed(() => [
      {
        title: 'Price',
        key: 'price'
      },
      {
        title: 'Quantity',
        key: 'quantity'
      },
      ...(!display.xs.value
        ? [
            {
              title: 'Total',
              key: 'total',
              value: (item: IOrderItem) => item.total.toFixed(5)
            }
          ]
        : [])
    ])

    onMounted(async () => {
      if (!state.snapshotLoaded) {
        socketConnection(rootStore.selectedPair)
        await syncSnapshot(rootStore.selectedPair)
      }
    })

    return { rootStore, asks, bids, headers }
  }
})
</script>

<style scoped>
.ask {
  color: red;
}

.bid {
  color: mediumseagreen;
}
</style>
