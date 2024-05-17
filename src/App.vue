<template>
  <div id="app" class="container">
    <SearchBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import { RouterView } from 'vue-router'
</script>
