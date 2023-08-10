<template>
    <div class="container mt-5">
        <!-- Match scheduling form -->
        <div class="row justify-content-center">
            <div class="col-md-12">
                <h2  class="text-center">Schedule a Match</h2>
                <form @submit.prevent="matchStore.editMatch(props.id,match,tags,tags2)">
                    <div class="form-group">
                        <label for="match_date">Date & Time:</label>
                        <input type="datetime-local" class="form-control" id="match_date"  step="1" v-model="match.date_time">
                        <p class="text-danger" v-if="matchStore.formErrors.date_time">{{ matchStore.formErrors.date_time[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="location">Location:</label>
                        <input type="text" class="form-control" id="location" placeholder="Enter Where The Match Will Take Place" v-model="match.location">
                        <p class="text-danger" v-if="matchStore.formErrors.location">{{ matchStore.formErrors.location[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="team_size">Team Size:</label>
                        <select class="form-control" id="team_size" v-model="match.team_size">
                            <option value="">Select Team Size</option>
                            <option value="5">5-a-side</option>
                            <option value="7">7-a-side</option>
                            <option value="11">11-a-side</option>
                        </select>
                        <p class="text-danger" v-if="matchStore.formErrors.team_size">{{ matchStore.formErrors.team_size[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="skill_level">Skill Level:</label>
                        <select class="form-control" id="skill_level" v-model="match.skill_level">
                            <option value="" selected>Select Skill Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <p class="text-danger" v-if="matchStore.formErrors.skill_level">{{ matchStore.formErrors.skill_level[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="home_team_name">Home Team Name:</label>
                        <input type="text" class="form-control" id="home_team_name" placeholder="Enter The Home Team Name" v-model="match.home_team_name">
                        <p class="text-danger" v-if="matchStore.formErrors.home_team_name">{{ matchStore.formErrors.home_team_name[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="home_player_names">Home Team Player Names (comma-separated):</label>
                        <vue-tags-input  placeholder="Add a player" v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" class="tags-input"/>
                        <!-- <input type="text" class="form-control" id="home_player_names" placeholder="Enter Home team player names" v-model="match.home_team_players"> -->
                        <p class="text-danger" v-if="matchStore.formErrors.home_team_players">{{ matchStore.formErrors.home_team_players[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="away_team_name">Away Team Name:</label>
                        <input type="text" class="form-control" id="away_team_name" placeholder="Enter The Away Team Name" v-model="match.away_team_name">
                        <p class="text-danger" v-if="matchStore.formErrors.away_team_name">{{ matchStore.formErrors.away_team_name[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="away_player_names">Away Team Player Names (comma-separated):</label>
                        <vue-tags-input placeholder="Add a player" v-model="tag2" :tags="tags2" @tags-changed="newTags2 => tags2 = newTags2" class="tags-input"/>
                        <!-- <input type="text" class="form-control" id="away_player_names" placeholder="Enter Away team player names" v-model="match.away_team_players"> -->
                        <p class="text-danger" v-if="matchStore.formErrors.away_team_players">{{ matchStore.formErrors.away_team_players[0] }}</p>
                    </div>
                    <button type="submit" class="btn btn-primary" v-if="!matchStore.loading">Update Match</button>
                    <button class="btn btn-primary " type="button" disabled style="background-color: #38003C;border-color: #38003C;" v-if="matchStore.loading">
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Updating...
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import VueTagsInput from '@sipec/vue3-tags-input';
import { useMatchStore } from "../stores/match.js";

const matchStore = useMatchStore();

const props = defineProps({
    id : {
        required: true,
        type: String,
    }
});

const tag = ref('');
const tags = ref([]);
const tag2 = ref('');
const tags2 = ref([]);

const match = ref({
    date_time: null,
    location: "",
    team_size: null,
    skill_level: null,
    home_team_name: "",
    home_team_players: "",
    away_team_name: "",
    away_team_players: ""
});

onMounted(async () => {
    await matchStore.getMatchDetails(props.id);
    match.value = matchStore.matchDetails;
    tags.value = match.value.home_team_players.split(",").map((elem) => {
            return {text: elem , tiClasses: "ti-valid" }
        });
        tags2.value = match.value.away_team_players.split(",").map((elem) => {
            return {text: elem , tiClasses: "ti-valid" }
        });
})

</script>

<!-- <script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from 'axios';
import { onMounted } from "vue";
import VueTagsInput from '@sipec/vue3-tags-input';

const router = useRouter();

const props = defineProps({
    id : {
        required: true,
        type: String,
    }
});

const tag = ref('');
const tags = ref([]);
const tag2 = ref('');
const tags2 = ref([]);

const match = ref({
    date_time: null,
    location: "",
    team_size: null,
    skill_level: null,
    home_team_name: "",
    home_team_players: "",
    away_team_name: "",
    away_team_players: ""
});
const errors = ref({});
const loading = ref(false);


const getMatchDetails = async () => {
    loading.value = true;
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/matches/${props.id}`);
        match.value.date_time = res.data.matche.date_time;
        match.value.location = res.data.matche.location;
        match.value.team_size = res.data.matche.team_size;
        match.value.skill_level = res.data.matche.skill_level;
        match.value.home_team_name = res.data.matche.home_team_name;
        match.value.home_team_players = res.data.matche.home_team_players;
        match.value.away_team_name = res.data.matche.away_team_name;
        match.value.away_team_players = res.data.matche.away_team_players;
        tags.value = match.value.home_team_players.split(",").map((elem) => {
            return {text: elem , tiClasses: "ti-valid" }
        });
        tags2.value = match.value.away_team_players.split(",").map((elem) => {
            return {text: elem , tiClasses: "ti-valid" }
        });
        loading.value = false
    } catch (error) {
        errors.value = error
        loading.value = false
    }
}

const editMatch = async () => {
    loading.value = true;
    try {
        match.value.home_team_players = tags.value.map((elem) => {
            return elem.text;
        }).join();
        match.value.away_team_players = tags2.value.map((elem) => {
            return elem.text;
        }).join();
        await axios.put(`http://127.0.0.1:8000/api/matches/${props.id}/edit`,match.value);
        await router.push({name: "matches"});
        loading.value = false;
    } catch (error) {
        errors.value = error.response.data.errors
        loading.value = false;
    }
}

onMounted(() => {
    getMatchDetails();
});

</script> -->
