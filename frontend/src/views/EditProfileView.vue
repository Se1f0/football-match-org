<template>
    <div class="container mt-5">
        <!-- Match scheduling form -->
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2  class="text-center">Edit My Profile</h2>
                <form>
                    <div class="form-group">
                        <label for="full_name">Full Name:</label>
                        <input type="text" class="form-control" id="full_name" placeholder="Full Name" v-model="profile.full_name">
                        <!-- <p class="text-danger" v-if="matchStore.formErrors.home_team_name">{{ matchStore.formErrors.home_team_name[0] }}</p> -->
                    </div>
                    <div class="form-group">
                        <label for="age">Age:</label>
                        <input type="number" class="form-control" id="age" placeholder="Age" v-model="profile.age">
                        <!-- <p class="text-danger" v-if="matchStore.formErrors.away_team_name">{{ matchStore.formErrors.away_team_name[0] }}</p> -->
                    </div>
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input type="text" class="form-control" id="address" placeholder="Address" v-model="profile.address">
                        <!-- <p class="text-danger" v-if="matchStore.formErrors.home_team_name">{{ matchStore.formErrors.home_team_name[0] }}</p> -->
                    </div>
                    <div class="form-group">
                        <label for="phone_number">Phone Number:</label>
                        <input type="text" class="form-control" id="phone_number" placeholder="Phone Number" v-model="profile.phone_number">
                        <!-- <p class="text-danger" v-if="matchStore.formErrors.home_team_name">{{ matchStore.formErrors.home_team_name[0] }}</p> -->
                    </div>
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary">Update Details</button>
                        <!-- <button class="btn btn-primary " type="button" disabled style="background-color: #38003C;border-color: #38003C;">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Updating...
                        </button> -->
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useProfileStore } from "../stores/profile.js";

const profileStore = useProfileStore();

const profile = ref({
    full_name: "",
    age: null,
    address: "",
    phone_number: ""
});

onMounted(async () => {
    await profileStore.getMyProfile();
    profile.value = profileStore.user
    console.log('profileStore.user :>> ', profileStore.user);
})
</script>