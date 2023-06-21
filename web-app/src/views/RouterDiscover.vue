<template>
  <div>
    <v-layout>
      <v-navigation-drawer permanent location="right" :width="400" class="bg-grey-lighten-4 elevation-3">
        <div class="bg-white pt-4">
          <div class="text-center bg-white">
          <img src="../assets/amazonia-logo.png" alt="amazonia-logo" class="header-logo" />
        </div>

        <v-tabs v-model="tab" color="red-darken-4" grow>
          <v-tab :value="'searcher'">Searcher</v-tab>
          <v-tab :value="'last'">Last searches</v-tab>
        </v-tabs>
        </div>
        
        
        <v-window v-model="tab" >
          
            <v-window-item value="searcher">
              <v-container class="pa-8">
                <h6 class="text-right font-weight-light">Complete the form bellow then click on button. </h6>
                <v-row class="mt-4">
                  <v-autocomplete :items="tableMapPositions" label="Where is the drone?" v-intersect>
                    <template v-slot:prepend>
                      <v-icon color="red-darken-4" :size="32">
                        mdi-quadcopter
                      </v-icon>
                    </template>
                  </v-autocomplete>
                </v-row>
                <v-row>
                  <v-autocomplete :items="tableMapPositions" label="Where will be the starting point?" v-intersect>
                    <template v-slot:prepend>
                      <v-icon color="green-darken-4" :size="32">
                        mdi-ray-start
                      </v-icon>
                    </template>
                  </v-autocomplete>
                </v-row>
                <v-row>
                  <v-autocomplete :items="tableMapPositions" label="Where will be the ending point?" v-intersect>
                    <template v-slot:prepend>
                      <v-icon color="blue-darken-4" :size="32">
                        mdi-ray-end
                      </v-icon>
                    </template>
                  </v-autocomplete>
                </v-row>
  
                <v-row justify="center" class="mt-5">
                  <v-btn color="red-darken-4">
                    <v-icon icon="mdi-map-search-outline" class="mr-2"></v-icon> find fastest route
                  </v-btn>
                </v-row>
              </v-container>
            </v-window-item>
            <v-window-item value="last">

            </v-window-item>
          
          </v-window>










      </v-navigation-drawer>
      <v-main>
        <v-container>

          <v-row>

          </v-row>


        </v-container>


      </v-main>
    </v-layout>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie';
import TableMap from "../components/table.json"

export default {
  name: 'router-discover-page',
  components: {
    Vue3Lottie
  },
  data() {
    return {
      tab: 'searcher',
      tableMapPositions: []
    }
  },
  mounted() {
    this.tableMapPositions = Object.keys(TableMap)
  }
}

</script>
