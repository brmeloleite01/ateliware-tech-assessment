import axios from "axios";
import {PossiblePathes} from "../types/PossiblePathes";

const endpoint = "https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f";

export class PossiblePathesAPI {
  static async fetchAll(): Promise<PossiblePathes> {
    const { data } =await axios.get(endpoint)
    return data as PossiblePathes
  }
}

