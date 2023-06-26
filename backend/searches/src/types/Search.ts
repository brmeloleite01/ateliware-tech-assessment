import { Timestamp } from "firebase-admin/firestore";

export type Search = {
    drone: string;
    start: string;
    end: string;
    date: Date | string | Timestamp;
    result: {
        pathes: string[][];
        time: number;
    };
};