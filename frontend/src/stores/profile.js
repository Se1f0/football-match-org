import { defineStore } from "pinia";
import axios from 'axios';

export const useProfileStore = defineStore("profile", {
    state: () => ({
        userProfile : null,
        ProfileErrors : [],
        loading : false,
        formErrors : [],
    }),
    getters: {
        user : (state) => {
            return state.userProfile;
        },
        errors : (state) => {
            return state.authErrors;
        }
    },
    actions: {
        async getMyProfile() {
            try {
                const resp = await axios.get('/api/profile');
                this.userProfile = resp.data
            } catch (error) {
                console.log('error :>> ', error);
            }
        },
        async editProfile(form) {
            this.formErrors = [];
            this.loading = true;
            try {
                await axios.put(`/api/profile/edit`,form);
                this.loading = false;
            } catch (error) {
                if (error.response.status === 422) {
                    this.formErrors = error.response.data.errors
                    this.loading = false;
                }
                console.log('error :>> ', error);
            }
        }
    }
})