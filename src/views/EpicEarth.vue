<template>
  <v-card variant="outlined" class="ma-1" :loading="isLoading" min-height="20">
    <v-select
      v-model="selectedDate"
      :items="avaiableImages"
      item-title="date"
      item-value="identifier"
      label="Select Date"
      @change="fetchEarthImage"
    ></v-select>

    <v-img :src="earthImageUrl" alt="Earth Image" @load="onImageLoaded" />
  </v-card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'

import { useStore } from 'vuex'
const store = useStore()
const api_key = store.state.apiKey

const earthImageUrl = ref('')
const isLoading = ref(true)
const avaiableImages = ref<string[]>([])
const selectedDate = ref<string>('')
const dayOfYear = ref<string>('')
const API_URL = 'https://api.nasa.gov/EPIC/api/enhanced'

onMounted(async () => {
  try {
    const response = await axios.get(API_URL, { params: { api_key } })
    avaiableImages.value = response.data.map((item: any) => ({
      identifier: item.identifier,
      date: item.date
    }))
    const latest = response.data[response.data.length - 1]
    dayOfYear.value = latest.date.split(' ')[0].replaceAll('-', '/') //format: YYY/MM/DD
    selectedDate.value = latest.identifier
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
})

watch(selectedDate, value => {
  fetchEarthImage(value)
})

async function fetchEarthImage(identifier: string) {
  try {
    if (!identifier) throw new Error('Could not find the latest image for this date')
    isLoading.value = true

    earthImageUrl.value = `https://epic.gsfc.nasa.gov/archive/natural/${dayOfYear.value}/png/epic_1b_${identifier}.png`
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
}

function onImageLoaded() {
  isLoading.value = false
}
</script>
