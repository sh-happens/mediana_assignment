<template>
  <div class="col" @click="openModal">
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
  <ModalComponent :isOpen="isModalOpened" @modal-close="closeModal" name="first-modal">
    <template #header>
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
    </template>
    <template #content>
      <h6>{{ article.title }}</h6>
    </template>
    <template #footer>
      <p>{{ article.description }}</p>
    </template>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaceholderImage from './PlaceholderImage.vue'
import type { Article } from '@/types/types'
import ModalComponent from './ModalComponent.vue'

defineProps<{
  article: Article
}>()

const isModalOpened = ref(false)

const openModal = () => {
  isModalOpened.value = true
}
const closeModal = () => {
  isModalOpened.value = false
}

const imageError = ref(false)
</script>

<style scoped>
.col img {
  max-width: 100%;
  height: auto;
}
</style>
