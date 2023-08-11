<style scoped>
.register {
    color: #38003C;
    text-decoration: underline;
    font-weight: bold;
}
.register:hover {
    color: #fff;
    font-weight: bold;
}
</style>

<template>
  <!-- Home page -->
  <header class="banner text-center py-5">
        <div class="container">
            <h1 class="display-4">Organize Football Matches with Ease</h1>
            <p class="lead">Football Organizer helps you coordinate matches with your friends hassle-free. Schedule,
                manage, and play!</p>
            <RouterLink to="/schedule" class="btn btn-primary btn-lg mb-2">Schedule a Match</RouterLink>
            <p>You don't have an account ? <RouterLink to="/register" class="register">Register here</RouterLink></p>
        </div>
    </header>


    <!-- Main content -->
    <div class="container mt-5">
        <!-- Upcoming matches -->
        <div class="row">
            <div class="col-md-12">
                <div v-if="!matchStore.loading && matchStore.upcomingMatches.length > 0 && !matchStore.errors">
                    <h2 class="text-center">Upcoming Matches</h2>
                    <ul class="list-group" id="upcoming_matches_list">
                        <!-- Sample upcoming match -->
                        <li class="list-group-item" v-for="(match,index) in matchStore.upcomingMatches" :key="index">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Date:</strong> {{ matchStore.formattedDate[index] }}
                                    <br>
                                    <strong>Time:</strong> {{ matchStore.formattedTime[index]}}
                                    <br>
                                    <strong>Team size:</strong> {{ match.team_size }}
                                    <br>
                                    <strong>Home Team:</strong> {{ match.home_team_name }}
                                    <br>
                                    <strong>Away Team:</strong> {{ match.away_team_name }}
                                </div>
                                <span class="badge badge-success">{{ match.location }}</span>
                            </div>
                            <RouterLink class="btn btn-sm btn-outline-secondary mr-2 mt-2" :to="{name: 'matchDetails', params: {id: match.id}}">Details</RouterLink>
                            <button class="btn btn-sm btn-outline-secondary mt-2">RSVP</button>
                        </li>
                    </ul>
                </div>
                <div class="text-center" v-if="matchStore.upcomingMatches.length === 0 && !matchStore.errors">
                    <h2>There no upcoming matches</h2>
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
        </div>

        <!-- About and Contact sections -->
        <div class="row mt-5">
            <div class="col-md-6">
                <h2>About Football Organizer</h2>
                <p>
                    Football Organizer is a platform designed to help you and your friends organize and enjoy football
                    matches in a hassle-free manner. Whether you're a seasoned player or just starting, this website is
                    your go-to place for coordinating matches.
                </p>
            </div>
            <div class="col-md-6">
                <h2>Contact Us</h2>
                <p>
                    If you have any questions or feedback, feel free to reach out to us at:
                    <br>
                    Email: sesegueni@gmail.com
                    <br>
                    Phone: +213 79 041 09 47
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMatchStore } from "../stores/match.js";

const matchStore = useMatchStore();

onMounted(async () => {
    await matchStore.getUpcomingMatches();
})
</script>