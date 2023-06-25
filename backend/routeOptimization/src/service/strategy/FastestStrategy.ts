import {PathTime} from "../../types/PathTime";
import {PossiblePathes} from "../../types/PossiblePathes";
import {IOptimizationStrategy} from "./IOptimizationStrategy";

export class FastestStrategy implements IOptimizationStrategy {
  optimize(possiblePathes: PossiblePathes, from: string, to: string): Promise<PathTime> {
    return new Promise((resolve) => resolve({} as PathTime));
  }
}
