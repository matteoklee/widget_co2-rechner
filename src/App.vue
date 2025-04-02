<script setup>
import {onMounted} from "vue";

onMounted(() => {
  console.log(import.meta.env.VITE_API_BASE_URL);
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
