<template>
  <div class="container text-center">
    <div class="row row-cols-3">
      <NewsItem v-for="article in articles" :key="article.id" :article="article" />
    </div>
    <div class="d-flex w-100 justify-content-center my-3">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: newsStore.currentPage <= 1 }">
            <a class="page-link" href="#" @click="changePage(newsStore.currentPage - 1)">&laquo;</a>
          </li>
          <li
            class="page-item"
            v-for="n in newsStore.totalPages"
            :key="n"
            :class="{ active: newsStore.currentPage === n }"
          >
            <a class="page-link" href="#" @click="changePage(n)">{{ n }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: newsStore.currentPage >= newsStore.totalPages }"
          >
            <a class="page-link" href="#" @click="changePage(newsStore.currentPage + 1)">&raquo;</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import NewsItem from './NewsItem.vue'
import type { Article } from '@/types/types'

import { useNewsStore } from '@/stores/newsStore'

const newsStore = useNewsStore()

const changePage = (page: number) => {
  if (page > 0 && page <= newsStore.totalPages) {
    newsStore.fetchNews('sports', 'publishedAt', page)
  }
}

defineProps<{
  articles: Article[]
}>()
</script>

<style scoped></style>
