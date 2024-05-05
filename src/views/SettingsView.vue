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
    <v-row v-if="changeLogs.length">
      <v-col md="4">
        <v-list lines="three" maxHeight="70vh">
          <v-list-item
            v-for="(pair, idx) in changeLogs"
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
              <p>
                Date: <b>{{ pair.timestamp.toLocaleString('ru') }}</b>
              </p>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <span v-else>current history is empty</span>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRootStore } from '@/stores/rootStore'

interface IPairItem {
  old: string
  new: string
  timestamp: Date
}

export default defineComponent({
  name: 'SettingsView',
  setup() {
    const rootStore = useRootStore()

    const selectedPair = ref('BTCUSDT')

    const changeLogs = ref<IPairItem[]>([])

    watch(selectedPair, (newPair, oldPair) => {
      rootStore.changePair(newPair)

      const newItem = {
        old: oldPair,
        new: newPair,
        timestamp: new Date()
      }

      changeLogs.value.push(newItem)
    })

    return { selectedPair, changeLogs }
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
