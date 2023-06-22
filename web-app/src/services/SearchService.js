
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
}

export default new SearchService()