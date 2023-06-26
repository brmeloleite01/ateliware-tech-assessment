import { Timestamp } from "firebase-admin/firestore";


export type SearchDocument = {
    drone: string;
    start: string;
    end: string;
    date: Timestamp;
    result: {
        firstPath: string[];
        secondPath: string[];
        time: number;
    };
};