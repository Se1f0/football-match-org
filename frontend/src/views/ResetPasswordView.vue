<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card p-4 shadow-lg">
                    <h2 class="primary-color text-center mb-4">Reset Password</h2>
                    <form @submit.prevent="authStore.handleResetPassword(form)">
                        <div class="form-group">
                            <label for="password">New Password</label>
                            <input type="password" class="form-control" id="password" v-model="form.password" placeholder="New Password">
                            <p class="text-danger" v-if="authStore.authErrors.password">{{ authStore.authErrors.password[0] }}</p>
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" class="form-control" id="confirm_password" placeholder="Confirm your Password" v-model="form.password_confirmation">
                            <p class="text-danger" v-if="authStore.authErrors.password_confirmation">{{ authStore.authErrors.password_confirmation[0] }}</p>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" v-if="!authStore.loading">Reset Password</button>
                        <button class="btn btn-primary btn-block" type="button" disabled style="background-color: #38003C;border-color: #38003C;" v-if="authStore.loading">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Resetting Password...
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
import { useRoute } from "vue-router";

const route = useRoute();
const authStore = useAuthStore();

const form = ref({
    password: '',
    password_confirmation: '',
    email: route.query.email,
    token: route.params.token
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