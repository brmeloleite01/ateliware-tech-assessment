

type Seconds = number

/**
 * {
 * "A1": {
 *  "A2": 1.5,
 *  "A4": 3.5
 * },
 * "A2": {
 *  "A3": 4.9
 * }
 * ...
 * }
 */
export type PossiblePathes = {
    [a: string]: {
        [b: string]: Seconds
    }
}
