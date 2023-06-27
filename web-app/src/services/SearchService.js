import axios from 'axios'

const routeOptimizationEndpoint = "https://southamerica-east1-ateliware-tech-assessment.cloudfunctions.net/routeOptimization/fastest"
const searchesEndpoint = "https://southamerica-east1-ateliware-tech-assessment.cloudfunctions.net/searches"

class SearchService {

    /**
     * @param {{ drone: string, start: string, end: string, result: { path: Array, time: number}}} search 
     */
    async save(search) {
        if(!search) return;

        await axios.post(searchesEndpoint, {...search, date: new Date()});

    }

    async list(){
        const { data } = await axios.get(searchesEndpoint)

        return data;
    }


    async findFastestRoute(search){
        const {data} = await axios.post(routeOptimizationEndpoint, search);

        return data;
    }
}

export default new SearchService();