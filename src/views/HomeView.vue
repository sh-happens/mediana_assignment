<template>
  <div class="home">
    <h1>Latest News</h1>
    <SearchBar @search="handleSearch" @authorSelected="handleAuthorSelected" />
    <div v-if="newsStore.loading">Loading...</div>
    <div v-else>
      <NewsList :articles="filteredArticles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNewsStore } from '../stores/newsStore'
import SearchBar from '../components/SearchBar.vue'
import NewsList from '../components/NewsList.vue'

const newsStore = useNewsStore()

const selectedAuthor = ref('')

const filteredArticles = computed(() => {
  return selectedAuthor.value
    ? newsStore.articles.filter((article) => article.author === selectedAuthor.value)
    : newsStore.articles
})

function handleSearch({ query, sortBy }: { query: string; sortBy: string }) {
  newsStore.fetchNews(query, sortBy)
}

const handleAuthorSelected = (author: string) => {
  selectedAuthor.value = author
}

onMounted(() => {
  newsStore.fetchNews()
})
</script>
