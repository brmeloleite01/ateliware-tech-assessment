<template>
    <div>

        <v-progress-linear v-show="isSearching" indeterminate color="red-darken-4"></v-progress-linear>
        <div class="chessboard elevation-5">
            <div class="row" v-for="row, i in matrix" :key="`matrix-row-${i}`">
                <div class="cell text-center justify-center"
                    :class="{ 'path-highlight': animation.cells.indexOf(cell) > -1 }" v-for="cell in row" :id="cell"
                    @drop="e => drop(e, cell)" @dragover="allowDrop">

                    <small v-show="!hideCellsID"
                        class="text-center align-self-top font-weight-black text-disabled position-absolute">
                        {{ cell }}
                    </small>

                    <div class="d-flex align-center justify-center">

                        <div v-if="objects.drone.position === cell"
                            class="draggable elevation-2 rounded-xl r bg-white animate__animated"
                            :class="{ 'animate__flip': !animation.show, 'animate__pulse': animation.show }"
                            :draggable="true" @dragstart="e => dragStart(e, 'drone')">

                            <v-avatar :size="28">
                                <v-icon :icon="objects.drone.icon.name" :size="20"
                                    :color="objects.drone.icon.color"></v-icon>
                            </v-avatar>
                            <v-icon v-if="animation.objectWithPackage === 'drone'" icon="mdi-package" :size="15"
                                color="amber" class="package-badge"></v-icon>

                        </div>


                        <div v-if="objects.start.position === cell"
                            class="draggable elevation-2 rounded-xl bg-white animate__animated"
                            :class="{ 'animate__flip': !routeAnimation }" :draggable="true"
                            @dragstart="e => dragStart(e, 'start')">
                            <v-avatar :size="28">
                                <v-icon :icon="objects.start.icon.name" :size="20"
                                    :color="objects.start.icon.color"></v-icon>
                            </v-avatar>

                            <v-icon v-if="animation.objectWithPackage === 'start'" icon="mdi-package" :size="15"
                                color="amber" class="package-badge"></v-icon>
                        </div>

                        <div v-if="objects.end.position === cell"
                            class="draggable elevation-2 rounded-xl bg-white animate__animated"
                            :class="{ 'animate__flip': !routeAnimation }" :draggable="true"
                            @dragstart="e => dragStart(e, 'end')">

                            <v-avatar :size="28">
                                <v-icon :icon="objects.end.icon.name" :size="20" :color="objects.end.icon.color"></v-icon>
                            </v-avatar>

                            <v-icon v-if="animation.objectWithPackage === 'end'" icon="mdi-package" :size="15" color="amber"
                                class="package-badge"></v-icon>

                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="map-options">
            <div>
                <v-switch v-model="hideCellsID" hide-details label="Hide cells ID" color="red-darken-4"></v-switch>
            </div>
        </div>


    </div>
</template>
<script>



export default {
    name: 'chessboard-map',
    props: {
        IDs: {
            type: Array,
        },
        objects: {
            type: Object
        },
        pathes: {
            type: Array[Array],
            default: undefined
        },
        isSearching: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            matrix: [],
            hideCellsID: true,
            animation: {
                show: false,
                cells: [],
                objectWithPackage: 'start' // drone, end 
            }
        }
    },
    mounted() {
        this.matrixBuilder(this.IDs)
    },
    methods: {
        matrixBuilder(arr) {
            for (let i = 0; i < arr.length; i += 8) {
                const row = arr.slice(i, i + 8);
                this.matrix.push(row)
            }
        },
        allowDrop(event) {
            event.preventDefault();
        },
        drop(event, cell) {
            event.preventDefault();
            const object = event.dataTransfer.getData('text/plain');
            this.$emit('onDropObject', { name: object, position: cell })
        },
        dragStart(event, itemId) {
            event.dataTransfer.setData('text/plain', itemId);
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },
        async animateRoute(droneToStart, startToEnd) {
            this.animation.show = true;
            for (let cell of droneToStart) {
                this.objects.drone.position = cell
                this.animation.cells.push(cell)
                await this.sleep(500)
            }

            this.animation.objectWithPackage = 'drone'

            for (let cell of startToEnd) {
                this.objects.drone.position = cell
                this.animation.cells.push(cell)
                await this.sleep(500)
            }

            this.animation.objectWithPackage = 'end'
            this.animation.show = false
        },

    },
    watch: {
        pathes: {
            deep: true,
            handler(pathes) {
                const [droneToStart, startToEnd] = pathes
                this.animateRoute(droneToStart, startToEnd)
            }
        }
    }

}

</script>
<style>
.chessboard {
    display: flex;
    width: 480px;
    border: 9px solid #333;
    flex-direction: column;
    opacity: 0.9;
}

.row {
    display: flex;
}

.cell {
    width: 60px;
    height: 60px;
    border: 1px solid #555;
    background-color: white;
    display: flex;
}


.draggable {
    transition: all 0.5s ease;
}

.row:nth-child(odd) .cell:nth-child(even),
.row:nth-child(even) .cell:nth-child(odd) {
    background-color: #333;
}

.cell.path-highlight {
    background-color: #b71c1ca0 !important;
}

.map-options {
    display: flex;
    justify-content: end;
    width: 100%;
    align-items: center;
}

.package-badge {
    position: absolute !important;
    margin-top: -10px;
    margin-left: -10px;
    border: 2px solid #fff
}
</style>