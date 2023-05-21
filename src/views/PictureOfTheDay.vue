<template>
  <v-card :loading="isLoading" class="pa-3 ma-1">
    <div style="display: inline-block">
      <v-text-field
        label="Select day"
        readonly-landscape
        v-model="selectedDate"
        variant="outlined"
        type="date"
        @change="fetchPictureOfTheDay"
        class="date-picker"
      />
    </div>
    <v-card variant="outlined" v-if="!isLoading">
      <h2>
        {{ picture.title }}
        <v-btn v-if="isLoggedIn" @click="addToFavorites">
          <v-icon :color="picture.isLiked ? 'purple' : 'white'">fa-heart</v-icon>
        </v-btn>
      </h2>
      <img :src="picture.url" :alt="picture.title" class="pa-2" style="max-width: 850px; max-height: 850px; display: 'inline-flex'" />
      <p>{{ picture.explanation }}</p>
    </v-card>
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
.date-picker {
  width: 200px;
}
</style>
