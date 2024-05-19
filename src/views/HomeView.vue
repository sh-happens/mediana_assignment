<template>
  <div class="home">
    <h1>Latest News</h1>
    <SearchBar @search="handleSearch" />
    <div v-if="newsStore.loading">Loading...</div>
    <div v-else>
      <NewsList :articles="newsStore.articles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewsStore } from '../stores/newsStore'
import SearchBar from '../components/SearchBar.vue'
import NewsList from '../components/NewsList.vue'

const newsStore = useNewsStore()

function handleSearch({ query, sortBy }: { query: string; sortBy: string }) {
  newsStore.fetchNews(query, sortBy)
}

onMounted(() => {
  newsStore.fetchNews()
})
</script>
