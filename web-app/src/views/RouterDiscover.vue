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


        <v-window v-model="tab">

          <v-window-item value="searcher">
            <v-alert closable icon="mdi-head-lightbulb-outline" title="What about a tip?"
              text="Drag and drop objects into the map."></v-alert>
            <v-container class="pa-8">

              <h6 class="text-right">Or complete the form manually. </h6>
              <v-row class="mt-4">
                <v-autocomplete v-model="objects.drone.position" :items="cellsIds" label="Where is the drone?"
                  v-intersect>
                  <template v-slot:prepend>
                    <v-icon class="draggable elevation-2 rounded-xl bg-white pa-4" id="drone" :draggable="true"
                      @dragstart="e => dragStart(e, 'drone')" :color="objects.drone.icon.color" :size="25">
                      {{ objects.drone.icon.name }}
                    </v-icon>
                  </template>
                </v-autocomplete>
              </v-row>
              <v-row>
                <v-autocomplete v-model="objects.start.position" :items="cellsIds"
                  label="Where will be the starting point?" v-intersect>
                  <template v-slot:prepend>
                    <v-icon class="draggable elevation-2 rounded-xl bg-white pa-4" :color="objects.start.icon.color"
                      :size="25" :draggable="true" @dragstart="e => dragStart(e, 'start')">
                      {{ objects.start.icon.name }}
                    </v-icon>
                  </template>
                </v-autocomplete>
              </v-row>
              <v-row>
                <v-autocomplete v-model="objects.end.position" :items="cellsIds"
                  label="Where will be the ending point?" v-intersect>
                  <template v-slot:prepend>
                    <v-icon class="draggable elevation-2 rounded-xl bg-white pa-4 border" :color="objects.end.icon.color"
                      :size="25" :draggable="true" @dragstart="e => dragStart(e, 'end')">
                      {{ objects.end.icon.name }}
                    </v-icon>
                  </template>
                </v-autocomplete>
              </v-row>

              <v-row justify="center" class="mt-5">
                <v-btn color="red-darken-4" @click="findFasterRoute()" :disabled="!canSearch">
                  <v-icon icon="mdi-map-search-outline" class="mr-2"></v-icon> find fastest route
                </v-btn>
              </v-row>
            </v-container>
          </v-window-item>

          <v-window-item value="last">
            <LastSearches :key="lastSearchesKeyComponent" class="pa-3" @showOnMap="showOnMap" />
          </v-window-item>

        </v-window>

      </v-navigation-drawer>
      <v-main>

        <v-container>
          <v-row justify="center" class="mb-0 mt-1" v-if="search.result">
            <v-col cols="5">
              <v-alert elevation="5" class="bg-white" icon="mdi-timer-marker-outline" title="Done!">
                The drone will take {{ search.result?.time.toFixed(2) }} seconds to do the delivery.
                <div class="d-flex justify-end mt-3">
                  <v-btn variant="text" color="red-darken-4" v-if="search.showOnMap" @click="showOnMap(search)">
                    <v-icon icon="mdi-map-marker-path"></v-icon> Show on map
                  </v-btn>
                </div>
              </v-alert>
            </v-col>
          </v-row>

          <v-row justify="center" :style="{ height: search.result ? '70vh' : '100vh' }">
            <Chessboard 
                @onDropObject="updateDropedObject" 
                :pathes="pathesToRender" 
                :objects="objects"
                :isSearching="searchInProgress"
                @cells="setCellIds"
                @onAnimationFinish="setAnimationIsOver"
              class="align-self-center " />
          </v-row>

        </v-container>


      </v-main>
    </v-layout>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie';
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
      objects: {
        drone: {
          position: undefined,
          icon: { color: 'red-darken-4', name: "mdi-quadcopter" },
        },
        start: { position: undefined, icon: { color: 'blue', name: "mdi-record-circle-outline" } },
        end: { position: undefined, icon: { color: 'green', name: "mdi-send-circle-outline" } }
      },
      lastSearchesKeyComponent: "",
      search: {},
      canSearch: false,
      searchInProgress: false,
      pathesToRender: undefined,
      cellsIds: [],
      animationIsOver: true
    }
  },
 
  methods: {
    dragStart(event, itemId) {
      event.dataTransfer.setData('text/plain', itemId);
    },
    updateDropedObject({ name, position }) {
      this.objects[name].position = position
    },
    renderLastSearchesComponent() {
      this.lastSearchesKeyComponent = `last-search-key-${Math.random().toString()}`
    },
    async findFasterRoute() {
      this.searchInProgress = true
      this.search = {
        drone: this.objects.drone.position,
        start: this.objects.start.position,
        end: this.objects.end.position,
        showOnMap: true
      }

      const result = await SearchService.findFastestRoute(this.search)
      this.search.result = result
      this.searchInProgress = false

      SearchService.save(this.search).then(() => this.renderLastSearchesComponent())

    },
    showOnMap(search){
      this.animationIsOver = false
      this.search = {...search, showOnMap: false}

      // show on map can be trigged on last results
      // they need set objects position
      this.objects.drone.position = search.drone
      this.objects.start.position = search.start
      this.objects.end.position = search.end
      this.pathesToRender = search.result.pathes
    },
    setCellIds(cells){
      this.cellsIds = cells
    },
    setAnimationIsOver(finish){
      this.animationIsOver = finish
    }
  },
  watch: {
    objects: {
      deep: true,
      handler() {
        if(this.animationIsOver){
          this.search = {};
          this.pathesToRender = null;
        }
        this.canSearch = (this.objects.drone?.position && this.objects.start?.position && this.objects.end?.position)
      }
    }
  }
}

</script>
