import {
  FastestStrategy,
} from "../../../../src/service/strategy/FastestStrategy";
import {PathTime} from "../../../../src/types/PathTime";
import {PossiblePathes} from "../../../../src/types/PossiblePathes";

describe("FastestStrategy", () => {
  let strategy: FastestStrategy;
  const possiblePathes: PossiblePathes = {
    "A1": {"B1": 10, "C1": 5},
    "B1": {"A1": 10, "C1": 2, "D1": 1},
    "C1": {"A1": 5, "B1": 2, "D1": 4},
    "D1": {"B1": 1, "C1": 4},
  };
  const from = "A1";
  const to = "D1";

  beforeEach(() => {
    strategy = new FastestStrategy();
  });

  it("should return the fastest path with time", async () => {
    const expectedPathTime: PathTime = {path: ["A1", "C1", "D1"], time: 9};

    const result = await strategy.optimize(possiblePathes, from, to);

    expect(result).toEqual(expectedPathTime);
  });
});
