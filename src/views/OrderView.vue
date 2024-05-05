<template>
  <v-container fluid>
    <v-row>
      <v-col md="6"> BIDS: </v-col>
      <v-col md="6"> ASKS: </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-data-table
          :fixed-header="true"
          :items="mockAsks"
          :items-per-page="100"
          :items-per-page-options="[100, 500, 1000]"
          height="75vh"
        ></v-data-table>
      </v-col>
      <v-col md="6">
        <v-data-table
          :fixed-header="true"
          :items="mockAsks"
          :items-per-page="100"
          :items-per-page-options="[100, 500, 1000]"
          height="75vh"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OrderView',
  setup() {
    const mockAsks = [
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      },
      {
        price: 123,
        quantity: 3,
        total: 1213
      }
    ]
    return { mockAsks }
  }
})
</script>

<style scoped></style>
