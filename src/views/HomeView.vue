<template>
  <div class="home">
    <h1>Latest News</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="article in articles" :key="article.id">
          <h2>{{ article.title }}</h2>
          <p>{{ article.summary }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Article {
  id: number
  title: string
  summary: string
}

const articles = ref<Article[]>([])
const loading = ref(true)

const fetchNews = async () => {
  loading.value = true
  try {
    const response = await fetch('https://api.example.com/news')
    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }
    const data = (await response.json()) as { articles: Article[] } // Assure TypeScript of the shape of your data
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
.home ul {
  list-style: none;
  padding: 0;
}
.home li {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
