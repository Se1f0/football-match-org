<template>
    <nav class="navbar navbar-expand-md">
        <a class="navbar-brand" href="#">Football Organizer</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto mr-auto">
                <li :class="{ 'nav-item': true , active: $route.path === '/' }">
                    <RouterLink class="nav-link" to="/">Home</RouterLink>
                </li>
                <li :class="{ 'nav-item': true , active: $route.path === '/matches' }">
                    <RouterLink class="nav-link" to="/matches">All Matches</RouterLink>
                </li>
                <!-- <li :class="{ 'nav-item': true , active: $route.path === '/schedule' }">
                    <RouterLink class="nav-link" to="/schedule">Schedule</RouterLink>
                </li> -->
                <template v-if="!authStore.user">
                    <li :class="{ 'nav-item': true , active: $route.path === '/login' }">
                        <RouterLink class="nav-link" to="/login">Login</RouterLink>
                    </li>
                    <!-- <li :class="{ 'nav-item': true , active: $route.path === '/register' }">
                        <RouterLink class="nav-link" to="/register">Register</RouterLink>
                    </li> -->
                </template>
                <template v-else>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ authStore.user.name }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <RouterLink class="dropdown-item" to="/my-profile">Profile</RouterLink>
                            <RouterLink class="dropdown-item" to="/my-matches">My Matches</RouterLink>
                            <a class="dropdown-item" @click="authStore.handleLogout">Logout</a>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const authStore = useAuthStore();

</script>