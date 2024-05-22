<template>
  <div class="col" @click="openModal">
    <div class="card shadow-sm">
      <div v-if="article.urlToImage" class="card-img-top">
        <img
          :src="article.urlToImage"
          @error="imageError = true"
          :alt="article.title"
          v-if="!imageError"
          class="img-fluid"
        />
        <PlaceholderImage v-if="imageError" />
      </div>
      <div class="card-body">
        <h6 class="card-title">{{ article.title }}</h6>
        <p class="card-text">{{ shortenParagraph(article.description, 100) }}</p>
      </div>
    </div>
  </div>
  <ModalComponent :isOpen="isModalOpened" @modal-close="closeModal">
    <template #header>
      <img
        :src="article.urlToImage"
        @error="imageError = true"
        :alt="article.title"
        class="img-fluid"
        v-if="!imageError"
      />
      <PlaceholderImage v-if="imageError" class="img-fluid" />
    </template>
    <template #content>
      <h5>{{ article.title }}</h5>
      <p>{{ article.description }}</p>
    </template>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaceholderImage from './PlaceholderImage.vue'
import ModalComponent from './ModalComponent.vue'
import type { Article } from '@/types/types'
import { shortenParagraph } from '@/helpers/shortenParagraph'

defineProps<{ article: Article }>()

const isModalOpened = ref(false)
const imageError = ref(false)

const openModal = () => (isModalOpened.value = true)
const closeModal = () => (isModalOpened.value = false)
</script>

<style scoped>
.card-img-top img,
.card-img-top .PlaceholderImage {
  height: 200px;
  border-radius: 5px;
  margin-top: 5px;
}

.card-img-top {
  display: flex;
  justify-content: center;
}

.col {
  cursor: pointer;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .card-img-top img,
  .card-img-top .PlaceholderImage {
    height: 150px;
  }
}
</style>
