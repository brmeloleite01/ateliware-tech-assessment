<template>
    <div>
        <v-container class="overflow-hidden mt-5">
            <v-row justify="center">
                <img src="../assets/amazonia-logo.png" alt="amazonia-logo" class="header-logo">
            </v-row>

            <v-row justify="center">
                <Vue3Lottie :animationData="DroneLogistics" class="drone-animation" />

            </v-row>

            <v-row justify="center">
                <div class="text-center mb-5">
                    <h5 class="text-h5">Unlock the Power of Efficiency</h5>
                    <h5 class="text-h5 font-weight-light">Optimize Your Drone Deliveries with Lightning-Fast Routes!</h5>
                </div>
            </v-row>
            <v-row justify="center" class="mt-5">
                <v-btn size="large" color="red-darken-4" @click="goToRouteDiscover()">
                    <v-icon icon="mdi-routes-clock" class="mr-2"></v-icon> GET STARTED
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>
<style scoped>
.drone-animation {
    width: 450px;
}

</style>
<script>
import { Vue3Lottie } from 'vue3-lottie';
import DroneLogistics from '@/assets/animations/drone-logistics.json'
export default {
    name: 'home-page',
    components: {
        Vue3Lottie
    },
    data() {
        return {
            DroneLogistics
        }
    },
    methods: {
        goToRouteDiscover(){
            this.$router.push('/router-discover')
        }
    }

}

</script>
  