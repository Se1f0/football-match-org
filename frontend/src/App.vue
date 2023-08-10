<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref,computed } from "vue";
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
    <!-- Navigation bar -->
    <NavBar/>
    <RouterView />
    <!-- Footer -->
    <Footer />
</template>

<style>
</style>
