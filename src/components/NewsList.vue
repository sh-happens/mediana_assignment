<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4" v-for="article in articles" :key="article.id">
        <NewsItem :article="article" />
      </div>
    </div>
    <div class="d-flex justify-content-center my-3">
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm">
          <li class="page-item" :class="{ disabled: newsStore.currentPage <= 1 }">
            <a class="page-link" href="#" @click="changePage(newsStore.currentPage - 1)">
              &laquo;
            </a>
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
            <a class="page-link" href="#" @click="changePage(newsStore.currentPage + 1)">
              &raquo;
            </a>
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

<style scoped>
.pagination {
  flex-wrap: wrap;
}

.page-link {
  padding: 0.25rem 0.5rem;
}

.col-12.col-md-6.col-lg-4 {
  margin-bottom: 1rem;
}
</style>
