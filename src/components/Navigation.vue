<template>
  <div class="responsive-menu">
    <v-app-bar-nav-icon @click="showMenu = !showMenu"></v-app-bar-nav-icon>

    <v-navigation-drawer v-model="showMenu" temporary>
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.path">
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isLoggedIn">
          <ProfileSettings style="display: inline" />
        </v-list-item>
        <v-list-item> </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4">
          <GoogleLogin @click.stop />
        </div>
      </template>
    </v-navigation-drawer>
  </div>

  <v-tabs color="green" align-tabs="center" class="responsive-tabs" centered bg-color="teal-darken-4">
    <v-spacer />
    <v-tab v-for="(item, index) in menuItems" :key="index" :to="item.path">
      {{ item.label }}
    </v-tab>
    <v-tab v-if="isLoggedIn">
      <ProfileSettings />
    </v-tab>
    <v-spacer />
    <v-tab>
      <GoogleLogin @click.stop />
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useStore } from 'vuex'
import GoogleLogin from './GoogleLogin.vue'
import ProfileSettings from './ProfileSettings.vue'

const store = useStore()
const showMenu = ref(true)
const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Picture of the day', path: '/picture-of-the-day' },
  { label: 'Earth', path: '/earth' },
  { label: 'Epic Earth', path: '/epic-earth' }
]

const isLoggedIn = computed(() => store.state.isLoggedIn)

function handleResize() {
  showMenu.value = window.innerWidth >= 600
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
@media (max-width: 800px) {
  .responsive-tabs {
    display: none;
  }
}

@media (min-width: 800px) {
  .responsive-menu {
    display: none;
  }
}
</style>
