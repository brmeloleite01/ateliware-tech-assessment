import { FastestStrategy } from '../../../../src/service/strategy/FastestStrategy';
import { PathTime } from '../../../../src/types/PathTime';
import { PossiblePathes } from '../../../../src/types/PossiblePathes';

describe('FastestStrategy', () => {
  let strategy: FastestStrategy;
  const possiblePathes: PossiblePathes = {
    // to define
  };
  const from = 'A1';
  const to = 'A3';

  beforeEach(() => {
    strategy = new FastestStrategy();
  });

  it('should return the fastest path with time', async () => {
    
    const expectedPathTime: PathTime = {
      path: ['A1', 'A2', 'A3'],
      time: 10,
    };

    const result = await strategy.optimize(possiblePathes, from, to);

    expect(result).toEqual(expectedPathTime);
  });
});
