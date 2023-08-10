<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card p-4 shadow-lg">
                    <h2 class="primary-color text-center mb-4">Register</h2>
                    <form @submit.prevent="authStore.handleRegister(form)">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter your Name" v-model="form.name">
                            <p class="text-danger" v-if="authStore.authErrors.name">{{ authStore.authErrors.name[0] }}</p>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter your Email" v-model="form.email">
                            <p class="text-danger" v-if="authStore.authErrors.email">{{ authStore.authErrors.email[0] }}</p>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter your Password" v-model="form.password">
                            <p class="text-danger" v-if="authStore.authErrors.password">{{ authStore.authErrors.password[0] }}</p>
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" class="form-control" id="confirm_password" placeholder="Confirm your Password" v-model="form.password_confirmation">
                            <p class="text-danger" v-if="authStore.authErrors.password_confirmation">{{ authStore.authErrors.password_confirmation[0] }}</p>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" v-if="!authStore.loading">Register</button>
                        <button class="btn btn-primary btn-block" type="button" disabled style="background-color: #38003C;border-color: #38003C;" v-if="authStore.loading">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Registering...
                        </button>
                        <div class="text-center mt-2">
                            <RouterLink class="login" to="/login">Already Registered ?</RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.js";

const authStore = useAuthStore();

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

</script>

<style scoped>
/* Main content background */
.container {
    background-color: #04f5ff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.login {
    color: #38003C;
    text-decoration: underline;
    font-weight: bold;
}
.login:hover {
    color: #04f5ff;
    font-weight: bold;
}
</style>