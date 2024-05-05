<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <img class="header-logo" src="../src/assets/logotip.png" alt="logo" />
      </template>

      <v-app-bar-title>
        <nav class="nav-wrapper">
          <RouterLink class="nav-link" activeClass="active" to="/settings">Settings</RouterLink>
          <RouterLink class="nav-link" activeClass="active" to="/order-book">Order book</RouterLink>
        </nav>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-fade-transition>
        <RouterView />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.header-logo {
  width: 45px;
  height: 45px;
}

.nav-wrapper {
  display: flex;

  .nav-link {
    text-decoration: none;

    &:visited {
      text-decoration: none;
      color: whitesmoke;
    }
    &.active {
      color: mediumseagreen;
    }
  }
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>
