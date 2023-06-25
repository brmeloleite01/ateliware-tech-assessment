import { describe, beforeEach, it, expect } from "@jest/globals";
import { RouteOptimization, RouteOptimizationError, ErrorType } from '../../../src/service/RouteOptimization'
import { PossiblePathes } from '../../../src/types/PossiblePathes';
import { IOptimizationStrategy } from '../../../src/service/strategy/IOptimizationStrategy';
import { PathTime } from '../../../src/types/PathTime';


describe('RouteOptimization', () => {
    let routeOptimization: RouteOptimization;
    const possiblePathes: PossiblePathes = {};
    const pathTimeMock : PathTime = { path: ['A1', 'A2', 'A3'], time: 10 }

    const strategyMock: IOptimizationStrategy = {
        optimize(pathes: PossiblePathes, from: string, to: string) : Promise<PathTime> {
            return new Promise((resolve) => resolve(pathTimeMock))
        }
    };

    beforeEach(() => {
        routeOptimization = new RouteOptimization(possiblePathes);
    });


    describe('useStrategy', () => {
        it('should set the optimization strategy', () => {
            routeOptimization.useStrategy(strategyMock);

            expect(routeOptimization.strategy).toBe(strategyMock);
        });
    });

    describe('optimize', () => {
        it('should throw an error if the optimization strategy is not defined', () => {
            expect(() => routeOptimization.optimize('A1', 'A7')).toThrowError(
                new RouteOptimizationError(ErrorType.DEVELOPMENT, 'Optimization Strategy was not defined')
            );
        });

        it('should add the promise to the list of promises to optimize', () => {
            routeOptimization.useStrategy(strategyMock);
            routeOptimization.optimize('A1', 'A7');

            expect(routeOptimization.promisesToOptimizeLength()).toBe(1);
        });
    });

    describe('get', () => {
        it('should return the optimized route', async () => {

            routeOptimization.useStrategy(strategyMock);
            routeOptimization.optimize('A1', 'A7');

            const route = await routeOptimization.get();

            expect(route.pathes).toEqual([['A1', 'A2', 'A3']]);
            expect(route.time).toBe(10);
        });
    });
});
