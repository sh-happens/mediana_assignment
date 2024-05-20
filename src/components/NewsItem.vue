<template>
  <div class="col" @click="openModal">
    <div class="card shadow">
      <div v-if="article.urlToImage">
        <img
          :src="article.urlToImage"
          @error="imageError = true"
          :alt="article.title"
          v-if="!imageError"
        />
        <PlaceholderImage v-if="imageError" />
      </div>
      <div class="card-body">
        <h6 class="card-title">{{ article.title }}</h6>
        <p class="card-text">{{ shortenParagraph(article.description) }}</p>
      </div>
    </div>
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
        <PlaceholderImage v-if="imageError" class="img-fluid" />
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
import { shortenParagraph } from '@/helpers/shortenParagraph'

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
  position: relative;
  width: auto;
  height: 200px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
  margin-top: 10px;
}

.col {
  cursor: pointer;
  margin-top: 20px;
}
</style>
