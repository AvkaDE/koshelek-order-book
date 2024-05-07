<template>
  <v-container fluid>
    <v-row>
      <v-col md="3">
        <v-select
          v-model="rootStore.selectedPair"
          label="Выберите валютную пару"
          :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']"
          variant="outlined"
          :menuProps="{
            closeOnContentClick: true
          }"
        ></v-select>
      </v-col>
    </v-row>

    История изменений
    <v-row v-if="rootStore.changelog.length">
      <v-col md="4">
        <v-list lines="three" maxHeight="70vh">
          <v-list-item
            v-for="(pair, idx) in reversedChangelog"
            :key="+pair.timestamp"
            :title="'Change #' + (rootStore.changelog.length - idx)"
          >
            <v-list-item-subtitle>
              Было
              <span class="old"
                ><b>{{ pair.old }}</b></span
              >
              <p>
                Стало:
                <span class="new"
                  ><b>{{ pair.new }}</b></span
                >
              </p>
              <p>
                Дата: <b>{{ pair.timestamp.toLocaleString('ru') }}</b>
              </p>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <span v-else>история изменения пуста, для обновления измените валютную пару</span>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, watch, computed, onMounted } from 'vue'
import { useRootStore } from '@/stores/rootStore'
import { socketConnection, syncSnapshot } from '@/api/socket'
import { state } from '@/api/state'

export default defineComponent({
  name: 'SettingsView',
  setup() {
    const rootStore = useRootStore()
    const reversedChangelog = computed(() => rootStore.changelog)

    watch(
      () => rootStore.selectedPair,
      async (newPair, oldPair) => {
        if (state.snapshotLoaded) {
          state.socket?.close()
          state.snapshotLoaded = false
        }

        rootStore.changePair(newPair, oldPair)
        socketConnection(newPair)
      }
    )

    onMounted(async () => {
      if (!state.snapshotLoaded) {
        socketConnection(rootStore.selectedPair)
        await syncSnapshot(rootStore.selectedPair)
      }
    })

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
