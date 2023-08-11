<template>
    <!-- Main content -->
    <div class="container mt-5">
        <template v-if="matchStore.message">
            <!-- <div class="alert alert-danger text-center mb-2" role="alert">
                {{ matchStore.message.content }}
            </div> -->
            <div class="alert alert-success text-center mb-2" role="alert" v-if="matchStore.message.status === 'success'">
                {{ matchStore.message.content }}
            </div>
        </template>
        
        <div v-if="!matchStore.loading && matchStore.allMatches.length > 0 && !matchStore.errors">
            <h1>All Matches</h1>
            <!-- Matches List -->
            <ul class="list-group">
                <!-- Sample match  -->
                <li  v-for="(match,index) in matchStore.allMatches" :key="index" class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Date:</strong> {{ matchStore.formattedDateAllMatches[index] }}
                            <br>
                            <strong>Time:</strong> {{ matchStore.formattedTimeAllMatches[index]}}
                            <br>
                            <strong>Skill Level:</strong> {{ match.skill_level }}
                            <br>
                            <strong>Team size:</strong> {{ match.team_size }}
                            <br>
                            <strong>Home Team:</strong> {{ match.home_team_name }}
                            <br>
                            <strong>Home Team Roaster:</strong> {{ match.home_team_players }}
                            <br>
                            <strong>Away Team:</strong> {{ match.away_team_name }}
                            <br>
                            <strong>Away Team Roaster:</strong> {{ match.away_team_players }}
                        </div>
                        <span class="badge badge-success">{{ match.location }}</span>
                    </div>
                    <div class="mt-2 text-center">
                        <!-- <button class="btn btn-sm btn-outline-secondary mr-2">RSVP</button> -->
                        <RouterLink class="btn btn-sm btn-outline-secondary mr-2" :to="{name: 'matchDetails', params: {id: match.id}}">Details</RouterLink>
                        <RouterLink class="btn btn-sm btn-outline-secondary mr-2" :to="{name: 'matchEdit', params: {id: match.id}}">Edit</RouterLink>
                        <button class="btn btn-sm btn-outline-secondary mr-2" @click="matchStore.deleteMatch(match.id)">Delete</button>
                    </div>
                    
                </li>
            </ul>
        </div>
        <div class="text-center" v-if="matchStore.allMatches.length === 0 && !matchStore.errors">
            <h2>No Matches found</h2>
        </div>
        <div class="text-center" v-if="matchStore.loading">
            <div class="spinner-grow" role="status" style="color: #38003C;">
                <span span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="text-center" v-if="matchStore.errors">
            <h1>{{ errors.message }}</h1>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMatchStore } from "../stores/match.js";

const matchStore = useMatchStore();

onMounted(async () => {
    await matchStore.getAllMatches();
})
</script>