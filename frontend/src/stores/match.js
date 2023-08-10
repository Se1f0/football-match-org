import { defineStore } from "pinia";
import axios from 'axios';
import moment from "moment";

export const useMatchStore = defineStore("match", {
    state: () => ({
        upcomingMatches : [],
        allMatches : [],
        matchDetails : null,
        loading : false,
        errors : null,
        formErrors : [],
        message : null
    }),
    getters: {
        formattedDate: (state) => {
            return state.upcomingMatches.map(match => moment(match.date_time.split(" ")[0]).format('dddd DD MMM YYYY'));
        },
        formattedTime: (state) => {
            return state.upcomingMatches.map(match => match.date_time.split(" ")[1].split(":").slice(0,2).join(":"));
        },
        formattedDateAllMatches: (state) => {
            return state.allMatches.map(match => moment(match.date_time.split(" ")[0]).format('dddd DD MMM YYYY'));
        },
        formattedTimeAllMatches: (state) => {
            return state.allMatches.map(match => match.date_time.split(" ")[1].split(":").slice(0,2).join(":"));
        },
        formattedDateMatchDetails: (state) => {
            return moment(state.matchDetails.date_time.split(" ")[0]).format('dddd DD MMM YYYY');
        },
        formattedTimeMatchDetails: (state) => {
            return state.matchDetails.date_time.split(" ")[1].split(":").slice(0,2).join(":");
        },
    },
    actions: {
        async getUpcomingMatches() {
            this.errors = null;
            this.loading = true;
            try {
                const res = await axios.get('/api/matches/upcoming');
                this.upcomingMatches = res.data.matches
                this.loading = false
            } catch (error) {
                this.errors = error
                this.loading = false
            }
        },
        async getAllMatches() {
            this.errors = null;
            this.loading = true
            try {
                const res = await axios.get('/api/matches');
                this.allMatches = res.data.matches
                this.loading = false
            } catch (error) {
                this.errors = error
                this.loading = false
            }
        },
        async getMatchDetails(id) {
            this.errors = null;
            this.loading = true;
            try {
                const res = await axios.get(`/api/matches/${id}`);
                console.log('res :>> ', res);
                this.matchDetails = res.data.matche
                console.log(this.matchDetails);
                this.loading = false
            } catch (error) {
                this.errors = error
                this.loading = false
            }
        },
        async deleteMatch(id) {
            this.errors = null;
            if (confirm('Are you sure you want to delete this match?')) {
                try {
                    const resp = await axios.delete(`/api/matches/${id}/delete`)
                    console.log('resp :>> ', resp);
                    await this.getAllMatches();
                    this.message = {
                        status : 'success',
                        content : resp.data.message
                    }
                } catch (error) {
                    this.errors = error
                }
                setTimeout(() => {
                    this.message = null;
                }, 2000);
            }
        },
        async createMatch(form,tags,tags2) {
            this.formErrors = [];
            this.loading = true;
            try {
                form.home_team_players = tags.map((elem) => {
                    return elem.text;
                }).join();
                form.away_team_players = tags2.map((elem) => {
                    return elem.text;
                }).join();
                const resp = await axios.post(`/api/matches/add`,form);
                this.message = {
                    status : 'success',
                    content : resp.data.message
                }
                await this.router.push({name: "matches"});
                this.loading = false;
            } catch (error) {
                if (error.response.status === 422) {
                    this.formErrors = error.response.data.errors
                    this.loading = false;
                }
            }
            setTimeout(() => {
                this.message = null;
            }, 2000);
        },
        async editMatch(id,form,tags,tags2) {
            this.formErrors = [];
            this.loading = true;
            try {
                form.home_team_players = tags.map((elem) => {
                    return elem.text;
                }).join();
                form.away_team_players = tags2.map((elem) => {
                    return elem.text;
                }).join();
                const resp = await axios.put(`/api/matches/${id}/edit`,form);
                this.message = {
                    status : 'success',
                    content : resp.data.message
                }
                await this.router.push({name: "matches"});
                this.loading = false;
            } catch (error) {
                if (error.response.status === 422) {
                    this.formErrors = error.response.data.errors
                    this.loading = false;
                }
            }
            setTimeout(() => {
                this.message = null;
            }, 2000);
        }
    }
})