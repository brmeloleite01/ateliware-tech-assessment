<template>
    <div>

        <v-toolbar color="red-darken-4" :rounded="0" :elevation="4" >
            

                <v-toolbar-title>Developer Portal</v-toolbar-title>
    
                <v-spacer></v-spacer>
    
                <template v-slot:extension>
                    <v-tabs v-model="tab" align-tabs="center">
                        <v-tab value="route">
                            Route Optimization
                        </v-tab>
                        <v-tab value="search">
                            Searches
                        </v-tab>
                    </v-tabs>
                </template>
            
        </v-toolbar>

        <v-window v-model="tab">
            <v-window-item value="route">
                <v-container>
                    <div id="swagger-route">

                    </div>
                </v-container>
            </v-window-item>
            <v-window-item value="search">
                <v-container>
                    <div id="swagger-searches">

                    </div>
                </v-container>

            </v-window-item>
        </v-window>


    </div>
</template>

<script>

import SwaggerUIBundle from "swagger-ui-dist/swagger-ui-bundle";
import 'swagger-ui-dist/swagger-ui.css';

const base = 'https://southamerica-east1-ateliware-tech-assessment.cloudfunctions.net/'

export default {
    name: 'developer',
    data() {
        return {
            apis: {
                routeOptimization: base.concat('routeOptimization/api-spec-json'),
                searches: base.concat('searches/api-spec-json')
            },
            tab: 'route',
            loadedBoth: false
        }
    },
    mounted() {



        SwaggerUIBundle({
            url: this.apis.routeOptimization,
            dom_id: '#swagger-route',
        })



    },
    watch: {
        tab: function (value) {
            if (value === 'search' && !this.loadedBoth) {
                setTimeout(() => {
                    SwaggerUIBundle({
                    url: this.apis.searches,
                    dom_id: '#swagger-searches',
                })    
                }, 500);

                this.loadedBoth = true
                
            }
        }
    }
}
</script>