<template>
    <!-- Match Details page -->
    <div class="container mt-5 match-details-outer">
        <div class="row justify-content-center" v-if="!matchStore.loading && matchStore.matchDetails">
            <div class="col-md-8">
                <div class="card match-details-card">
                    <div class="card-body">
                        <h2 class="primary-color">Match Details</h2>
                        <h4 class="mb-4">Match on {{ matchStore.formattedDateMatchDetails }} at {{ matchStore.formattedTimeMatchDetails }}</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Location:</strong> {{ matchStore.matchDetails.location }}</p>
                                <p><strong>Team Size:</strong> {{ matchStore.matchDetails.team_size }}-a-side</p>
                                <p><strong>Skill Level:</strong> {{ matchStore.matchDetails.skill_level }}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="text-center"><strong>Home Team :</strong> {{ matchStore.matchDetails.home_team_name }}</p>
                                <p class="text-center">Vs</p>
                                <p class="text-center"><strong>Away Team :</strong> {{ matchStore.matchDetails.away_team_name }}</p>
                            </div>
                        </div>
                        <h4 class="mt-4 primary-color">{{ matchStore.matchDetails.home_team_name }}'s Line-Up</h4>
                        <ul class="list-group">
                            <li class="list-group-item text-center" v-for="(player,index) in matchStore.matchDetails.home_team_players.split(',')" :key="index">
                                {{ player }}
                            </li>
                        </ul>
                        <h4 class="mt-4 primary-color">{{ matchStore.matchDetails.away_team_name }}'s Line-Up</h4>
                        <ul class="list-group">
                            <li class="list-group-item text-center" v-for="(player,index) in matchStore.matchDetails.away_team_players.split(',')" :key="index">
                                {{ player }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center" v-if="matchStore.loading">
            <div class="spinner-grow" role="status" style="color: #38003C;">
                <span span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="text-center" v-if="matchStore.errors">
            <h1>Error</h1>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMatchStore } from "../stores/match.js";

const matchStore = useMatchStore();

const props = defineProps({
    id : {
        required: true,
        type: String,
    }
});

onMounted(async () => {
    await matchStore.getMatchDetails(props.id);
})
</script>

<!-- <script setup>
import { ref,computed } from "vue";
import axios from 'axios';
import moment from "moment";
import { onMounted } from "vue";

const match = ref();
const loading = ref(false);
const errors = ref(null);

const props = defineProps({
    id : {
        required: true,
        type: String,
    }
});

const formattedDate = computed(() => {
    return moment(match.value.date_time.split(" ")[0]).format('dddd DD MMM YYYY')
});

const formattedTime = computed(() => {
    return match.value.date_time.split(" ")[1].split(":").slice(0,2).join(":");
});

const getMatchDetails = async () => {
    loading.value = true;
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/matches/${props.id}`);
        console.log('res :>> ', res);
        match.value = res.data.matche
        loading.value = false
    } catch (error) {
        errors.value = error
        loading.value = false
    }
}

onMounted(() => {
    getMatchDetails();
});

</script> -->