import { defineStore } from "pinia";
import axios from 'axios';

export const useProfileStore = defineStore("profile", {
    state: () => ({
        userProfile : null,
        ProfileErrors : [],
        loading : false,
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
        }
    }
})