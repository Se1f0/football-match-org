<template>
    <div class="container mt-5" v-if="profileStore.user">
        <div class="row">
            <div class="col-md-4">
                <!-- Player Avatar (Placeholder) -->
                <img src="../assets/images/default.jpg" alt="Player Avatar" class="img-fluid" width="320">
                <h2 class="primary-color text-center mt-2">{{ profileStore.user.full_name }}</h2>
                <!-- <p class="text-muted">Striker</p> -->
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title primary-color">Player Information</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <strong>Full Name:</strong> {{ profileStore.user.full_name }}
                            </li>
                            <li class="list-group-item">
                                <strong>Age:</strong> {{ profileStore.user.age }}
                            </li>
                            <li class="list-group-item">
                                <strong>Address:</strong> {{ profileStore.user.address}}
                            </li>
                            <li class="list-group-item">
                                <strong>Phone Number:</strong> {{ profileStore.user.phone_number }}
                            </li>
                            <li class="list-group-item">
                                <strong>Bio:</strong>
                                <textarea class="form-control" id="additional_info" rows="3"
                                placeholder="Edit your profile to add the bio" readonly></textarea>
                            </li>
                        </ul>
                    </div>
                </div>
                <button type="button" class="btn btn-success mt-2 float-right">Edit Profile</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProfileStore } from "../stores/profile.js";

const profileStore = useProfileStore();

onMounted(async () => {
    await profileStore.getMyProfile();
    console.log('profileStore.user :>> ', profileStore.user);
})
</script>