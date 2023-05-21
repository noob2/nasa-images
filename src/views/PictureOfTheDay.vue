<template>
  <v-card :loading="isLoading" class="pa-3 ma-1" variant="outlined">
    <div style="display: inline-block">
      <v-text-field
        label="Select day"
        readonly-landscape
        v-model="selectedDate"
        variant="outlined"
        type="date"
        @change="fetchPictureOfTheDay"
        style="width: 200px"
        hide-details
      />
    </div>
    <h2>
      {{ picture.title }}
      <v-btn v-if="isLoggedIn" @click="addToFavorites" icon="fa-heart" :color="picture.isLiked ? 'purple' : 'white'" size="x-small" />
    </h2>
    <img :src="picture.url" :alt="picture.title" class="pa-2" id="image" />
    <p>{{ picture.explanation }}</p>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

import { useStore } from 'vuex'
const store = useStore()
const api_key = store.state.apiKey

const isLoggedIn = computed(() => {
  return store.state.isLoggedIn
})

interface Picture {
  url: string
  title: string
  explanation: string
  isLiked: boolean
}

const picture = ref<Picture>({
  url: '',
  title: '',
  explanation: '',
  isLiked: false
})

const isLoading = ref(true)
const error = ref('')
const today = new Date().toJSON().split('T')[0] // date in format 'YYY-MM-DD'
const selectedDate = ref<string>(today)

const fetchPictureOfTheDay = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: { api_key, date: selectedDate.value }
    })
    picture.value = response.data

    const isLiked = store.getters.isImageInFavorites(picture.value.url)
    picture.value.isLiked = isLiked
  } catch (err) {
    error.value = 'Failed to fetch picture of the day.'
  } finally {
    isLoading.value = false
  }
}

function addToFavorites() {
  picture.value.isLiked = !picture.value.isLiked
  store.dispatch('addToFavorites', picture.value)
}

onMounted(fetchPictureOfTheDay)
</script>

<style scoped>
#image {
  max-width: 850px;
  max-height: 850px;
  display: 'inline-flex';
}

@media (max-width: 850px) {
  #image {
    max-width: 100%;
  }
}
</style>
