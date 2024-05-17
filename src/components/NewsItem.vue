<template>
  <div class="col">
    <div v-if="article.urlToImage">
      <img
        :src="article.urlToImage"
        @error="imageError = true"
        :alt="article.title"
        class="img-fluid"
        v-if="!imageError"
      />
      <PlaceholderImage v-if="imageError" />
    </div>
    <div v-else>
      <PlaceholderImage />
    </div>
    <h6>{{ article.title }}</h6>
    <p>{{ article.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaceholderImage from './PlaceholderImage.vue'

interface Article {
  id: number
  title: string
  description: string
  urlToImage?: string
}

const props = defineProps<{
  article: Article
}>()

const imageError = ref(false)
</script>

<style scoped>
.col img {
  max-width: 100%;
  height: auto;
}
</style>
