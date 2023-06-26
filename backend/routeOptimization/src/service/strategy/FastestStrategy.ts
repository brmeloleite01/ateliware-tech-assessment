import {PathTime} from "../../types/PathTime";
import {PossiblePathes} from "../../types/PossiblePathes";
import {IOptimizationStrategy} from "./IOptimizationStrategy";

type CameFrom = { [key: string]: string | null }

/**
 * This strategy was implemented using A* (a star) algorithm
 * see more about: https://en.wikipedia.org/wiki/A*_search_algorithm
 */
export class FastestStrategy implements IOptimizationStrategy {
  private from = "";
  private to = "";

  /**
   * Modified Manhattan distance
   * (only considers vertical and horizontal movements)
   */
  private heuristic(node: string): number {
    const [x1, y1] = node.split("");
    const [x2, y2] = this.to.split("");

    return Math.abs(parseInt(x1) - parseInt(x2)) +
                    Math.abs(parseInt(y1) - parseInt(y2));
  }

  private reconstructPath(cameFrom: CameFrom, current: string): string[] {
    const path: string[] = [current];
    let node = current;

    while (cameFrom[node]) {
      node = cameFrom[node]!;
      path.unshift(node);
    }

    return path;
  }


  optimize(pathes: PossiblePathes, from: string, to: string): Promise<PathTime> {
    this.from = from;
    this.to = to;
    return new Promise((resolve) => {
      const openSet: string[] = [from];
      const cameFrom: { [key: string]: string | null } = {};
      const gScore: { [key: string]: number } = {};
      const fScore: { [key: string]: number } = {};

      gScore[from] = 0;
      fScore[from] = this.heuristic(this.from);

      while (openSet.length > 0) {
        const current = openSet.reduce((a, b) => (fScore[b] < fScore[a] ? b : a));


        if (current === to) {
          resolve({path: this.reconstructPath(cameFrom, current), time: gScore[current]});
          return;
        }

        openSet.splice(openSet.indexOf(current), 1);

        for (const neighbor in pathes[current]) {
          if (neighbor === from) {
            continue;
          }

          const tentativeGScore = gScore[current] + pathes[current][neighbor];

          if (!gScore[neighbor] || tentativeGScore < gScore[neighbor]) {
            cameFrom[neighbor] = current;
            gScore[neighbor] = tentativeGScore;
            fScore[neighbor] = gScore[neighbor] + this.heuristic(neighbor);

            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            }
          }
        }
      }

      resolve({path: [], time: -1});
    });
  }
}

