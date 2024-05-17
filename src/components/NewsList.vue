<template>
  <div class="container text-center">
    <div class="row row-cols-3">
      <NewsItem v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import NewsItem from './NewsItem.vue'

interface Article {
  id: number
  title: string
  summary: string
}

const props = defineProps<{
  articles: Article[]
}>()
</script>

<style scoped></style>
