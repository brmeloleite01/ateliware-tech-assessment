import {PathTime} from "../types/PathTime";
import {PossiblePathes} from "../types/PossiblePathes";
import {Route} from "../types/Route";
import {IOptimizationStrategy} from "./strategy/IOptimizationStrategy";


export enum ErrorType {
    DEVELOPMENT = "DEVELOPMENT",
    EXTERNAL = "EXTERNAL"
}

export class RouteOptimizationError extends Error {
  type : ErrorType;
  constructor(type: ErrorType, message: string) {
    super(message);
    this.type = type;
  }
}

export class RouteOptimization {
  private possiblePathes : PossiblePathes;
  private promisesToOptimize : Promise<PathTime>[] = [];
  strategy : IOptimizationStrategy | undefined;


  promisesToOptimizeLength() : number {
    return this.promisesToOptimize.length;
  }


  constructor(possiblePathes: PossiblePathes) {
    this.possiblePathes = possiblePathes;
  }

  useStrategy(strategy : IOptimizationStrategy) : RouteOptimization {
    this.strategy = strategy;
    return this;
  }

  /**
     * @param from "A1"
     * @param to "A7"
     * @param id "drone-start" | "start-end"
     */
  optimize(from: string, to: string): RouteOptimization {
    if (!this.strategy) {
      throw new RouteOptimizationError(ErrorType.DEVELOPMENT,
        "Optimization Strategy was not defined");
    }

    const promise = this.strategy?.optimize(this.possiblePathes, from, to);

    this.promisesToOptimize.push(promise);

    return this;
  }

  async get() : Promise<Route> {
    const route : Route = {
      pathes: [],
      time: 0,
    };

    const result = await Promise.all(this.promisesToOptimize);

    result.forEach((pt: PathTime) => {
      route.pathes.push(pt.path);
      route.time += pt.time;
    });

    return route;
  }
}
