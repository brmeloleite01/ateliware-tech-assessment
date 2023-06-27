export type Search = {
    drone: string;
    start: string;
    end: string;
    date: Date | string;
    result: {
        pathes: string[][];
        time: number;
    };
};
