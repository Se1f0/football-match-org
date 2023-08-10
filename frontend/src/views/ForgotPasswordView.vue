<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card p-4 shadow-lg">
                    <h2 class="primary-color text-center mb-4">Forgot Password</h2>
                    <form @submit.prevent="authStore.handleForgotPassword(form)">
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Email">
                            <p class="text-danger" v-if="authStore.authErrors.email">{{ authStore.authErrors.email[0] }}</p>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" v-if="!authStore.loading">Send Email</button>
                        <button class="btn btn-primary btn-block" type="button" disabled style="background-color: #38003C;border-color: #38003C;" v-if="authStore.loading">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Sending Reset Link...
                        </button>
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
    email: '',
});
</script>

<style scoped>
/* Main content background */
.container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #04f5ff;
}

.register {
    color: #38003C;
    text-decoration: underline;
    font-weight: bold;
}
.register:hover {
    color: #04f5ff;
    font-weight: bold;
}
</style>
