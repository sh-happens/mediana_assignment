<template>
  <div class="home">
    <h1>Latest News</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <NewsList :articles="articles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NewsList from '../components/NewsList.vue'

interface Article {
  id: number
  title: string
  summary: string
  urlToImage: string
}

const articles = ref<Article[]>([])
const loading = ref(true)

const fetchNews = async () => {
  loading.value = true
  try {
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=1b93aec0e1f44e2c9baf112fc2ed5332'
    )
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

onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
.home h1 {
  color: #333;
}
</style>
