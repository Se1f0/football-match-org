import { defineStore } from "pinia";
import axios from 'axios';

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser : null,
        authErrors : [],
        loading : false,
    }),
    getters: {
        user : (state) => {
            return state.authUser;
        },
        errors : (state) => {
            return state.authErrors;
        }
    },
    actions: {
        async getToken() {
            try {
                await axios.get('/sanctum/csrf-cookie');
            } catch (error) {
                console.log('get token error :>> ', error);
            }
        },
        async getUser() {
            this.authErrors = [];
            await this.getToken();
            try {
                const data = await axios.get('/api/user');
                this.authUser = data.data;
            } catch (error) {
                console.log('error :>> ', error);
            }
        },
        async handleLogin(form) {
            this.loading = true;
            this.authErrors = [];
            await this.getToken();
            try {
                await axios.post('/login', {
                    email: form.email,
                    password: form.password
                });
                this.router.push("/");
                this.loading = false;
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                    this.loading = false;
                }
                console.log('error :>> ', error);
            }
        },
        async handleRegister(form) {
            this.loading = true;
            this.authErrors = [];
            await this.getToken();
            try {
                await axios.post('/register', {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.password_confirmation
                });
                this.router.push("/");
                this.loading = false;
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                    this.loading = false;
                }
                console.log('error :>> ', error);
            }
        },
        async handleLogout() {
            try {
                await axios.post('/logout');
                this.authUser = null;
            } catch (error) {
                console.log('error :>> ', error);
            }
        },
        async handleForgotPassword(form) {
            this.loading = true;
            this.authErrors = [];
            this.getToken();
            try {
                await axios.post('/forgot-password', {
                    email: form.email
                });
                this.loading = false;
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                    this.loading = false;
                }
                console.log('error :>> ', error);
            }
        },
        async handleResetPassword(form) {
            this.loading = true;
            this.authErrors = [];
            try {
                const response = await axios.post('/reset-password',form);
                this.router.push('/login');
                this.loading = false;
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                    this.loading = false;
                }
                console.log('error :>> ', error);
            }
        }
    }
})