<template>
  <div class="container text-center">
    <div class="row row-cols-3">
      <NewsItem v-for="article in newsStore.articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '@/stores/newsStore'
import NewsItem from './NewsItem.vue'
const newsStore = useNewsStore()
</script>

<style scoped></style>
