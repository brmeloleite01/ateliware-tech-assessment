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

        {{ currentSearch }}

        <v-window v-model="tab">

          <v-window-item value="searcher">
            <v-alert closable icon="mdi-head-lightbulb-outline" title="What about a tip?" text="Drag and drop objects into the map."></v-alert>
            <v-container class="pa-8">
            
              <h6 class="text-right">Or complete the form manually. </h6>
              <v-row class="mt-4">
                <v-autocomplete v-model="objects.drone.position" :items="tableMapPositions" label="Where is the drone?" v-intersect>
                  <template v-slot:prepend>
                    <v-icon class="draggable" id="drone" :draggable="true" @dragstart="e => dragStart(e, 'drone')" :color="objects.drone.icon.color" :size="32">
                      {{objects.drone.icon.name}}
                    </v-icon>
                  </template>
                </v-autocomplete>
              </v-row>
              <v-row>
                <v-autocomplete v-model="objects.start.position" :items="tableMapPositions" label="Where will be the starting point?" v-intersect>
                  <template v-slot:prepend>
                    <v-icon class="draggable" :color="objects.start.icon.color" :size="32" :draggable="true" @dragstart="e => dragStart(e, 'start')">
                      {{objects.start.icon.name}}
                    </v-icon>
                  </template>
                </v-autocomplete>
              </v-row>
              <v-row>
                <v-autocomplete v-model="objects.end.position" :items="tableMapPositions" label="Where will be the ending point?" v-intersect>
                  <template v-slot:prepend>
                    <v-icon class="draggable" :color="objects.end.icon.color" :size="32" :draggable="true" @dragstart="e => dragStart(e, 'end')">
                      {{objects.end.icon.name}}
                    </v-icon>
                  </template>
                </v-autocomplete>
              </v-row>

              <v-row justify="center" class="mt-5">
                <v-btn color="red-darken-4" @click="findFasterRoute()">
                  <v-icon icon="mdi-map-search-outline" class="mr-2"></v-icon> find fastest route
                </v-btn>
              </v-row>
            </v-container>
          </v-window-item>
          
          <v-window-item value="last">
            <LastSearches :key="lastSearchesKeyComponent"  class="pa-3"/>
          </v-window-item>

        </v-window>

      </v-navigation-drawer>
      <v-main>
        <v-container>
          
          <v-row justify="center" style="height: 100vh">
            <Chessboard @onDropObject="updateDropedObject"  :objects="objects" :IDs="tableMapPositions" v-if="tableMapPositions.length > 0" class="align-self-center"/>
          </v-row>

        </v-container>


      </v-main>
    </v-layout>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie';
import TableMap from "@/components/table.json";
import Chessboard from '@/components/Chessboard.vue';
import LastSearches from '@/components/LastSearches.vue';
import SearchService from "@/services/SearchService";

export default {
  name: 'router-discover-page',
  components: {
    Vue3Lottie,
    Chessboard,
    LastSearches
},
  data() {
    return {
      tab: 'searcher',
      tableMapPositions: [],
      objects: {
        drone: {
          position: undefined,
          icon: { color: 'red-darken-4', name: "mdi-quadcopter"},
        },
        start: {position: undefined, icon: {color: 'blue', name: "mdi-record-circle-outline"} },
        end: {position: undefined, icon: {color: 'green', name: "mdi-send-circle-outline"}}
      },
      route: ["A1", "B1"],
      lastSearchesKeyComponent: "",
      search: {}
    }
  },
  mounted() {
    this.tableMapPositions = Object.keys(TableMap)
  },
  methods: {
    dragStart(event, itemId) {
      event.dataTransfer.setData('text/plain', itemId);
    },
    updateDropedObject({name, position}){
      this.objects[name].position = position
    },
    renderLastSearchesComponent(){
      this.lastSearchesKeyComponent = `last-search-key-${Math.random().toString()}`
    },
    async findFasterRoute(){
      this.search = {
        drone: this.objects.drone.position,
        start: this.objects.start.position,
        end: this.objects.end.position
      }

      //mocking result
      this.search.result = {
        path: ["A1", "A2", "A3"],
        time: 3.5
      }


      await SearchService.save(this.search)
      this.renderLastSearchesComponent()
    },

  }
}

</script>
