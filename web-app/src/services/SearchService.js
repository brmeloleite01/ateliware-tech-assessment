import axios from 'axios'

const routeOptimizationEndpoint = "https://southamerica-east1-ateliware-tech-assessment.cloudfunctions.net/routeOptimization/fastest"
const searchesEndpoint = "https://southamerica-east1-ateliware-tech-assessment.cloudfunctions.net/searches"

class SearchService {

    

    constructor(){
        this.items = []
    }

    /**
     * @param {{ drone: string, start: string, end: string, result: { path: Array, time: number}}} search 
     */
    async save(search) {
        if(!search) return;

        if (this.items.length >= 10) {
            this.items.shift();
        }
        this.items.push(search);
    }

    async findFastestRoute(search){
        const {data} = await axios.post(routeOptimizationEndpoint, search)

        return data;
    }
}

export default new SearchService()