<template>
    <div>

        <v-progress-linear v-show="isSearching" indeterminate color="red-darken-4"></v-progress-linear>
        <div class="chessboard elevation-5">
            <div class="row" v-for="row, i in matrix" :key="`matrix-row-${i}`">
                <div class="cell text-center justify-center"
                    :class="{ 'path-highlight': path.length > 0 && path.indexOf(cell) > -1 }" v-for="cell in row" :id="cell"
                    @drop="e => drop(e, cell)" @dragover="allowDrop">
                    <small v-show="!hideCellsID"
                        class="text-center align-self-top font-weight-black text-disabled position-absolute">{{ cell
                        }}</small>

                    <div class="d-flex align-center justify-center">

                        <div v-if="objects.drone.position === cell" class="draggable elevation-2 rounded-xl r bg-white"
                            :draggable="true" @dragstart="e => dragStart(e, 'drone')">
                            <v-avatar :size="28">
                                <v-icon :icon="objects.drone.icon.name" :size="20"
                                    :color="objects.drone.icon.color"></v-icon>
                            </v-avatar>
                        </div>


                        <div v-if="objects.start.position === cell" class="draggable elevation-2 rounded-xl bg-white"
                            :draggable="true" @dragstart="e => dragStart(e, 'start')">
                            <v-avatar :size="28">
                                <v-icon :icon="objects.start.icon.name" :size="20"
                                    :color="objects.start.icon.color"></v-icon>
                            </v-avatar>

                            <v-icon icon="mdi-package" :size="15" color="amber"
                                style="position:absolute; margin-top: -10px; margin-left: -5px"></v-icon>
                        </div>

                        <div v-if="objects.end.position === cell" class="draggable elevation-2 rounded-xl bg-white"
                            :draggable="true" @dragstart="e => dragStart(e, 'end')">

                            <v-avatar :size="28">
                                <v-icon :icon="objects.end.icon.name" :size="20" :color="objects.end.icon.color"></v-icon>
                            </v-avatar>

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
        path: {
            type: Array,
            default: []
        },
        isSearching: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            matrix: [],
            droneIconSize: 20,
            startIconSize: 20,
            endIconSize: 20,
            hideCellsID: true
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

        // TO DO: fix - Icon size foreach object
        setIconSize(objects) {
            const positions = Object.keys(objects).map(o => objects[o].position)
            const hasSamePosition = positions.some((element, index) => positions.indexOf(element) !== index);
            this.iconSize = hasSamePosition ? 10 : 55
        }
    },
    watch: {
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


.draggable{
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
</style>