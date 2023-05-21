<template>
  <v-app>
    <Navigation />
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
