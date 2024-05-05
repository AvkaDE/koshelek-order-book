<template>
  <v-container fluid>
    <v-row>
      <v-col md="3">
        <v-select
          v-model="selectedPair"
          label="Select currency"
          :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']"
          variant="outlined"
        ></v-select>
      </v-col>
    </v-row>

    Change history:
    <v-row>
      <v-col md="4">
        <v-list lines="three">
          <v-list-item
            v-for="(pair, idx) in mockLogs"
            :key="+pair.timestamp"
            :title="'Change #' + (idx + 1)"
          >
            <v-list-item-subtitle>
              Old:
              <span class="old"
                ><b>{{ pair.old }}</b></span
              >
              <p>
                New:
                <span class="new"
                  ><b>{{ pair.new }}</b></span
                >
              </p>
              <p>Date: {{ pair.timestamp.toLocaleString('ru') }}</p>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SettingsView',
  setup() {
    const selectedPair = ref('BTCUSDT')

    const mockLogs = [
      {
        old: 'BTCUSDT',
        new: 'BNBBTC',
        timestamp: new Date(2024, 3, 5, 20, 13, 22)
      },
      {
        old: 'BNBBTC',
        new: 'BTCUSDT',
        timestamp: new Date(2024, 1, 2, 11, 12, 35)
      },
      {
        old: 'BTCUSDT',
        new: 'ETHBTC',
        timestamp: new Date(2024, 6, 7, 10, 3, 16)
      },
      {
        old: 'ETHBTC',
        new: 'BNBBTC',
        timestamp: new Date(2024, 8, 9, 15, 45, 67)
      },
      {
        old: 'BNBBTC',
        new: 'ETHBTC',
        timestamp: new Date(2024, 7, 7, 9, 3, 2)
      },
      {
        old: 'ETHBTC',
        new: 'BTCUSDT',
        timestamp: new Date(2024, 1, 1, 20, 7, 26)
      }
    ]
    return { selectedPair, mockLogs }
  }
})
</script>

<style scoped lang="scss">
.old {
  color: red;
}

.new {
  color: mediumseagreen;
}
</style>
