import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, {Request, Response} from "express";
import { Search } from "./types/Search";
import { Timestamp } from "firebase-admin/firestore";

const service = express();
service.use(express.json());

const collection = admin
                    .initializeApp()
                    .firestore()
                    .collection('searches');


service.post("", async (request: Request, response: Response) => {
    const search: Search = request.body as Search

    search.date = Timestamp.fromDate(new Date(search.date as string))

    try{
        await collection.add(search);
        response.status(201).json({message: 'Search was storaged'});

    }catch(error){
        response.status(500).json({message: error});
    }

});

service.get("", async (request: Request, response: Response) => {
    const limit = request.query.limit ? Number.parseInt(request.query.limit as string) : 10 ;
    
    const snapshot = await collection
                            .orderBy('date', 'desc')
                            .limit(limit).get();

    const searches: Search[] = snapshot.docs.map(doc => doc.data() as Search);

    response.status(200).json(searches);
});

export const searches = functions
    .region("southamerica-east1")
    .https
    .onRequest(service);

