<template>
  <v-card variant="outlined" class="ma-1" :loading="isLoading" min-height="20">
    <v-img :src="earthImageUrl" alt="Earth Image" id="panzoom-element" @load="onImageLoaded" />
  </v-card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Panzoom from '@panzoom/panzoom'

import { useStore } from 'vuex'
const store = useStore()
const api_key = store.state.apiKey

const earthImageUrl = ref('')
const isLoading = ref(true)

const API_URL = 'https://api.nasa.gov/planetary/earth/assets'

const getLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

onMounted(async () => {
  try {
    const location = await getLocation()
    const { latitude, longitude } = location.coords

    const response = await axios.get(API_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        date: '2022-1-22',
        dim: 0.15,
        api_key
      }
    })

    earthImageUrl.value = response.data.url
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
})

function attachPanZoom() {
  const elem = document.getElementById('panzoom-element')
  if (elem) {
    const panzoom = Panzoom(elem, {
      maxScale: 5
    })
    elem.parentElement?.addEventListener('wheel', panzoom.zoomWithWheel)
  }
}

function onImageLoaded() {
  isLoading.value = false
  attachPanZoom()
}
</script>

<style>
/* Add any custom styles here */
</style>
