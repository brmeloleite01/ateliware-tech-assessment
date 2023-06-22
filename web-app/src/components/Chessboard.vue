<template>
    <div>
        <div class="chessboard elevation-8">
            <div class="row" v-for="row, i in matrix" :key="`matrix-row-${i}`">
                <div class="cell text-center justify-center" v-for="cell in row" :id="cell" @drop="e => drop(e, cell)"
                    @dragover="allowDrop">
                    <span v-if="objects.drone.position === cell">
                        <v-icon :icon="objects.drone.icon.name" :color="objects.drone.icon.color" :draggable="true"
                            @dragstart="e => dragStart(e, 'drone')" :size="droneIconSize"></v-icon>
                    </span>
                    <span v-if="objects.start.position === cell">
                        <v-icon :icon="objects.start.icon.name" :color="objects.start.icon.color" :draggable="true"
                            @dragstart="e => dragStart(e, 'start')" :size="startIconSize"></v-icon>
                    </span>
                    <span v-if="objects.end.position === cell">
                        <v-icon :icon="objects.end.icon.name" :color="objects.end.icon.color" :draggable="true"
                            @dragstart="e => dragStart(e, 'end')" :size="endIconSize"></v-icon>
                    </span>
                </div>
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
        }
    },
    data() {
        return {
            matrix: [],
            droneIconSize: 55,
            startIconSize: 55,
            endIconSize: 55
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
        setIconSize(objects){
            const positions = Object.keys(objects).map(o => objects[o].position)
            console.log(positions)
            const hasSamePosition = positions.some((element, index) => positions.indexOf(element) !== index);
            this.iconSize = hasSamePosition ? 25 : 55
        }
    },
    watch: {
        // 'objects': {
        //     deep: true,
        //     handler(value) {
        //         this.setIconSize(value)
        //     }
        // }
    }

}

</script>
<style>
.chessboard {
    display: flex;
    width: 480px;
    border: 3px solid #555;
    flex-direction: column;
    opacity: 0.9
}

.row {
    display: flex;
}

.cell {
    width: 60px;
    height: 60px;
    border: 2px solid #555;
    background-color: white;
}


.row:nth-child(odd) .cell:nth-child(even),
.row:nth-child(even) .cell:nth-child(odd) {
    background-color: #333;
}</style>