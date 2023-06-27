import {PathTime} from "../../types/PathTime";
import {PossiblePathes} from "../../types/PossiblePathes";

export interface IOptimizationStrategy {
    optimize(pathes: PossiblePathes,
            from: string,
            to: string) : Promise<PathTime>
}
