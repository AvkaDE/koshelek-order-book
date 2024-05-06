<template>
  <v-container fluid>
    <v-row>
      <v-col md="3">
        Selected currency pair: <b>{{ rootStore.selectedPair }}</b>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6"> BIDS: </v-col>
      <v-col md="6"> ASKS: </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-data-table
          :fixed-header="true"
          :items="asks"
          :items-per-page="100"
          :items-per-page-options="[100, 500, 1000]"
          height="75vh"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="ask">
                {{
                  Number(item.price) > 1
                    ? Number(item.price).toPrecision(5)
                    : Number(item.price).toFixed(5)
                }}
              </td>
              <td>{{ Number(item.quantity).toPrecision(5) }}</td>
              <td>{{ Number(item.total).toPrecision(5) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col md="6">
        <v-data-table
          :fixed-header="true"
          :items="bids"
          :items-per-page="100"
          :items-per-page-options="[100, 500, 1000]"
          height="75vh"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="bid">
                {{
                  Number(item.price) > 1
                    ? Number(item.price).toPrecision(5)
                    : Number(item.price).toFixed(5)
                }}
              </td>
              <td>{{ Number(item.quantity).toPrecision(5) }}</td>
              <td>{{ Number(item.total).toPrecision(5) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { state } from '@/api/socket'
import { useRootStore } from '@/stores/rootStore'

export default defineComponent({
  name: 'OrderView',
  setup() {
    const rootStore = useRootStore()

    const asks = computed(() => state.result.asks.sort((a, b) => +b.price - +a.price))
    const bids = computed(() => state.result.bids.sort((a, b) => +b.price - +a.price))
    return { rootStore, asks, bids }
  }
})
</script>

<style scoped>
.ask {
  color: mediumseagreen;
}

.bid {
  color: red;
}
</style>
