<template>
    <!-- <footer class="text-white text-center py-3 mt-5 authpage">
        &copy; 2023 Football Organizer. All rights reserved.
    </footer> -->
    <footer :class="{'text-white text-center py-3 mt-5': true , 'authpage': $route.path === '/login' || $route.path === '/register' || $route.path === '/forgot-password' || $route.path === '/reset-password'}">
        &copy; 2023 Football Organizer. All rights reserved.
    </footer>
</template>