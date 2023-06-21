<template>
  <div>
    <v-layout>
      <v-navigation-drawer permanent location="right">

        FORM options

      </v-navigation-drawer>
      <v-main>
        <v-container>

          MAP view
        

        </v-container>

        
      </v-main>
    </v-layout>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie';
import DroneLogistics from '@/assets/animations/drone-logistics.json'
export default {
  name: 'start-page',
  components: {
    Vue3Lottie
  },
  data() {
    return {
      DroneLogistics
    }
  },

}

</script>
