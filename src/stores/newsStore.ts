import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article } from '@/types/types'

export const useNewsStore = defineStore('news', () => {
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const maxAllowedArticles = 100

  async function fetchNews(
    searchTerm: string = 'sports',
    sortBy: string = 'publishedAt',
    page: number = 1
  ) {
    currentPage.value = page
    loading.value = true
    const pageSize = 10
    const maxPage = Math.ceil(maxAllowedArticles / pageSize)

    if (page > maxPage) {
      console.log('Requested page exceeds the limit of allowed articles.')
      loading.value = false
      return
    }

    const endpoint = `https://newsapi.org/v2/everything?language=ru&q=${searchTerm}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      const data = (await response.json()) as { articles: Article[]; totalResults: number }
      articles.value = data.articles
      totalPages.value = Math.min(maxPage, Math.ceil(data.totalResults / pageSize))
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      loading.value = false
    }
  }

  return { articles, loading, fetchNews, currentPage, totalPages }
})
