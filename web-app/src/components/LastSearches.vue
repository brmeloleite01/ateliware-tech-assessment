<template>
    <div class="overflow-y-auto">

        <div class="mx-auto text-center" v-if="items.length === 0">
            <Vue3Lottie :animationData="EmptyListAnimation" />
            <h5 class="text-h5 font-weight-light">There is not any search yet.</h5>
        </div>

        <div class="pa-3 mr-3" v-if="items.length > 0">
            <h5 class="text-right font-weight-light">Showing last {{ items.length }} searches</h5>
        </div>

        <v-expansion-panels v-if="items.length > 0">
            <v-expansion-panel  v-for="(item, i) in items" :key="`last-search-${i}`">
                <v-expansion-panel-title>
                    <div class="d-flex text-center justify-space-around mb-1" style="width: 50%">
                    <div>
                        <v-icon icon="mdi-quadcopter text-disabled"></v-icon>
                        <h6 class="mt-2">{{ item.drone }}</h6>
                    </div>

                    <div>
                        <v-icon icon="mdi-record-circle-outline text-disabled"></v-icon>
                        <h6 class="mt-2">{{ item.start }}</h6>
                    </div>

                    <div>
                        <v-icon icon="mdi-send-circle-outline text-disabled"></v-icon>
                        <h6 class="mt-2">{{ item.end }}</h6>
                    </div>


                </div>
                
                <div style="position: absolute; right: 70px; top: 15px">
                        <v-icon icon="mdi-timer-marker-outline text-green"></v-icon>
                        <h6 class="mt-2">{{ item.result.time }} s</h6>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-btn block variant="text" prependIcon="mdi-map-marker-path" color="red-darken-4" @click="e => emitShowOnMap(item)">Show on map</v-btn>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

    </div>
</template>
<script>
import { Vue3Lottie } from 'vue3-lottie'
import EmptyListAnimation from '@/assets/animations/empty-list.json'
import SearchService from '@/services/SearchService'

export default {
    name: 'last-searches',
    components: {
        Vue3Lottie
    },
    data() {
        return {
            items: [],
            EmptyListAnimation
        }
    },
    mounted() {
        this.items = [...SearchService.items].reverse()
    },
    methods: {
        emitShowOnMap(search) {
            this.$emit('showOnMap', search)
        }
    }
}
</script>