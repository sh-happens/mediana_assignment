import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article } from '@/types/types'

export const useNewsStore = defineStore('news', () => {
  const articles = ref<Article[]>([])
  const loading = ref(false)
  async function fetchNews(searchTerm: string = 'sports', sortBy: string = 'publishedAt') {
    loading.value = true
    const endpoint = `https://newsapi.org/v2/everything?language=ru&q=${searchTerm}&sortBy=${sortBy}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
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

  return { articles, loading, fetchNews }
})
