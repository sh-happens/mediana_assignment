<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
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
            <router-link class="nav-link active" to="/" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Author
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-item" to="/action">Action</li>
              <li class="dropdown-item" to="/another-action">Another action</li>
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
              Sort by
            </a>
            <ul class="dropdown-menu">
              <li @click="selectSortOption('relevancy')" class="dropdown-item">Relevancy</li>
              <li @click="selectSortOption('popularity')" class="dropdown-item">Popularity</li>
              <li @click="selectSortOption('publishedAt')" class="dropdown-item">
                Publishing date
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
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const searchQuery = ref('sports')
const selectedSort = ref('publishedAt')
const emits = defineEmits(['search'])

const submitSearch = () => {
  emits('search', { query: searchQuery.value, sortBy: selectedSort.value })
}

const selectSortOption = (option: string) => {
  selectedSort.value = option
}
</script>
