import https from "https";
import { PossiblePathes } from "../types/PossiblePathes";

const endpoint = "https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f";

export class PossiblePathesAPI {
  static async fetchAll(): Promise<PossiblePathes> {
    return new Promise((resolve, reject) => {
      https.get(endpoint, (res) => {
        res.on("data", (data) => resolve(data as PossiblePathes));
      
        res.on("error", (error) => {
          console.log("Error", error);
          reject(error);
        });
      });
    });
  }
}

