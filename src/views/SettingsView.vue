<template>
  <v-container fluid>
    <v-row>
      <v-col md="3">
        <v-select
          v-model="rootStore.selectedPair"
          label="Select currency"
          :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']"
          variant="outlined"
          :menuProps="{
            closeOnContentClick: true
          }"
        ></v-select>
      </v-col>
    </v-row>

    Change history:
    <v-row v-if="rootStore.changelog.length">
      <v-col md="4">
        <v-list lines="three" maxHeight="70vh">
          <v-list-item
            v-for="(pair, idx) in reversedChangelog"
            :key="+pair.timestamp"
            :title="'Change #' + (rootStore.changelog.length - idx)"
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
import { defineComponent, watch, computed } from 'vue'
import { useRootStore } from '@/stores/rootStore'
import { socket } from '@/api/socket'

export default defineComponent({
  name: 'SettingsView',
  setup() {
    const rootStore = useRootStore()

    const reversedChangelog = computed(() => rootStore.changelog)

    watch(
      () => rootStore.selectedPair,
      (newPair, oldPair) => {
        rootStore.changePair(newPair, oldPair)

        socket(newPair)
      }
    )

    return { rootStore, reversedChangelog }
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
