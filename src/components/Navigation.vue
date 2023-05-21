<template>
  <div class="responsive-menu">
    <v-app-bar-nav-icon @click="showMenu = !showMenu"></v-app-bar-nav-icon>

    <v-navigation-drawer v-model="showMenu" temporary>
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.path">
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <GoogleLogin @click.stop />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

  <v-tabs color="green" align-tabs="center" class="responsive-tabs" centered>
    <v-tab v-for="(item, index) in menuItems" :key="index" :to="item.path">
      {{ item.label }}
    </v-tab>
    <v-tab>
      <GoogleLogin @click.stop />
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GoogleLogin from './GoogleLogin.vue'

const showMenu = ref(true)
const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Picture of the day', path: '/picture-of-the-day' },
  { label: 'Earth', path: '/earth' },
  { label: 'Epic Earth', path: '/epic-earth' }
]

function handleResize() {
  showMenu.value = window.innerWidth >= 600
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // Call the handler initially
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* CSS for small screens (less than 600px) */
@media (max-width: 800px) {
  .responsive-tabs {
    display: none; /* Hide the tabs */
  }
}

/* CSS for larger screens (greater than or equal to 600px) */
@media (min-width: 800px) {
  .responsive-menu {
    display: none; /* Hide the menu */
  }
}
</style>
