<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/" aria-current="page"
              >Домашняя страница</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">О нас</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Фильтрация по авторам
            </a>
            <ul class="dropdown-menu">
              <li @click="selectAuthor()" class="dropdown-item">Все</li>
              <li
                v-for="author in uniqueAuthors"
                :key="author"
                @click="selectAuthor(author)"
                class="dropdown-item"
              >
                {{ author }}
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Сортировка
            </a>
            <ul class="dropdown-menu">
              <li @click="selectSortOption('relevancy')" class="dropdown-item">По релевантности</li>
              <li @click="selectSortOption('popularity')" class="dropdown-item">По популярности</li>
              <li @click="selectSortOption('publishedAt')" class="dropdown-item">
                По дате публикации
              </li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search" @submit.prevent="submitSearch">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchQuery"
          />
          <button class="btn btn-outline-success" type="submit">Поиск</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useNewsStore } from '@/stores/newsStore'
import { ref, defineEmits, computed } from 'vue'

const newsStore = useNewsStore()

const uniqueAuthors = computed(() => {
  const authors = newsStore.articles.map((article) => article.author).filter(Boolean)
  return Array.from(new Set(authors))
})

const selectedAuthor = ref('')

const emits = defineEmits(['search', 'authorSelected'])

const selectAuthor = (author?: string) => {
  if (!author) {
    selectedAuthor.value = ''
    emits('authorSelected', '')
    return
  }
  selectedAuthor.value = author
  emits('authorSelected', author)
}

const searchQuery = ref('sports')
const selectedSort = ref('publishedAt')

const submitSearch = () => {
  emits('authorSelected', '')
  emits('search', { query: searchQuery.value, sortBy: selectedSort.value })
}

const selectSortOption = (option: string) => {
  selectedSort.value = option
}
</script>
