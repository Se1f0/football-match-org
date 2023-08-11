<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth.js";

import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

const authStore = useAuthStore();

onMounted(async () => {
    await authStore.getUser();
})

</script>

<template>
    <!-- Navigation bar -->
    <NavBar/>
    <RouterView />
    <!-- Footer -->
    <Footer />
</template>
