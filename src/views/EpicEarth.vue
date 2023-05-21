<template>
  <v-card variant="outlined" :loading="isLoading" min-height="20">
    <div id="sliderContainer" class="ma-2">
      <v-slider v-model="selectedItem" :min="0" :max="avaiableImages.length - 1" :step="1" hide-details />
      <v-btn @click="togglePlay">
        <v-icon v-if="isPlaying" color="error">fa-pause</v-icon>
        <v-icon v-else color="success">fa-play</v-icon>
      </v-btn>
    </div>
    <v-chip class="mb-2" color="success" variant="outlined">
      <v-icon start>fa-clock</v-icon>
      {{ selectedDate }}
    </v-chip>
    <img :src="earthImageUrl" alt="Earth Image" @load="onImageLoaded" id="earthImage" />
  </v-card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

import { useStore } from 'vuex'
const store = useStore()
const api_key = store.state.apiKey

interface ImageItem {
  identifier: string
  date: string
}

const selectedItem = ref<number>(-1)

const earthImageUrl = ref('')
const isLoading = ref(true)
const avaiableImages = ref<ImageItem[]>([])

const dayOfYear = ref<string>('')
const API_URL = 'https://api.nasa.gov/EPIC/api/enhanced'

let intervalId: number | null = null
const isPlaying = ref(false)

onMounted(async () => {
  try {
    const response = await axios.get(API_URL, { params: { api_key } })
    avaiableImages.value = response.data.map((item: any) => ({
      identifier: item.identifier,
      date: item.date
    }))
    const latest = response.data[response.data.length - 1]
    dayOfYear.value = latest.date.split(' ')[0].replaceAll('-', '/') //format: YYY/MM/DD
    selectedItem.value = 0
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
})

watch(selectedItem, () => {
  fetchEarthImage()
})

async function fetchEarthImage() {
  const identifier = avaiableImages.value[selectedItem.value]?.identifier
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

const selectedDate = computed(() => avaiableImages.value[selectedItem.value]?.date)

function togglePlay() {
  if (isPlaying.value) {
    clearInterval(intervalId!)
    intervalId = null
  } else {
    intervalId = setInterval(() => {
      selectedItem.value = (selectedItem.value + 1) % avaiableImages.value.length
    }, 2000)
  }
  isPlaying.value = !isPlaying.value
}

onUnmounted(() => {
  clearInterval(intervalId!)
})
</script>

<style scoped>
#sliderContainer {
  display: flex;
}
#earthImage {
  width: 100%;
  max-width: 850px;
  max-height: 850px;
  display: flex;
  margin: 0 auto;
  border-radius: 8px;
  margin-bottom: 12px;
}
</style>
