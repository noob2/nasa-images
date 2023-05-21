<template>
  <div>
    <v-card id="googleHolder">
      <GoogleLogin
        v-if="!isLoggedIn"
        :callback="callback"
        :buttonConfig="{
          type: 'icon',
          theme: 'filled_black',
          shape: 'square'
        }"
      />
    </v-card>

    <div v-if="isLoggedIn" style="display: contents">
      <v-btn @click="signOut" color="error">Sign Out</v-btn>
      <ProfileSettings style="display: contents" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSettings from './ProfileSettings.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isLoggedIn = computed(() => store.state.isLoggedIn)

const callback = (response: any) => {
  store.dispatch('setLoggedIn', true)
}

const signOut = () => {
  store.dispatch('setLoggedIn', false)
}
</script>

<style scoped>
#googleHolder {
  display: inline-flex;
  border-radius: 6px;
}
</style>
