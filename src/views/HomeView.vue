<template>
  <div class="home">
    <h1>Latest News</h1>
    <SearchBar @search="handleSearch" />
    <div v-if="loading">Loading...</div>
    <div v-else>
      <NewsList :articles="articles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import NewsList from '../components/NewsList.vue'

interface Article {
  id: number
  title: string
  summary: string
  urlToImage?: string
}

const articles = ref<Article[]>([])
const loading = ref(true)
const apiKey = '1b93aec0e1f44e2c9baf112fc2ed5332'

const fetchNews = async (searchTerm: string = 'sports', sortBy: string = 'publishedAt') => {
  loading.value = true
  const endpoint = `https://newsapi.org/v2/everything?language=ru&q=${searchTerm}&sortBy=${sortBy}&apiKey=${apiKey}`
  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }
    const data = (await response.json()) as { articles: Article[] }
    articles.value = data.articles
  } catch (error) {
    console.error('Error fetching news:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch({ query, sortBy }: { query: string; sortBy: string }) {
  fetchNews(query, sortBy)
}

onMounted(() => {
  fetchNews()
})
</script>
