import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, {Request, Response} from "express";
import {Search} from "./types/Search";
import {SearchAdapter} from "./adapters/SearchAdapter";
import {SearchDocument} from "./types/SearchDocument";
import * as openapiSpec from "./search-api-specification.json";

const service = express();
service.use(express.json());

const collection = admin
  .initializeApp()
  .firestore()
  .collection("searches");


service.post("", async (request: Request, response: Response) => {
  const search: Search = request.body as Search;

  try {
    await collection.add(SearchAdapter.toDocument(search));
    response.status(201).json({message: "Search was storaged"});
  } catch (error) {
    response.status(500).json({message: error});
  }
});

service.get("", async (request: Request, response: Response) => {
  const query = request.query;
  const snapshot = await collection
    .orderBy("date", "desc")
    .limit(request.query.limit? Number.parseInt(query.limit as string) : 10)
    .get();

  const searches: Search[] =
          snapshot.docs
            .map((doc) => SearchAdapter.toSearch(doc.data() as SearchDocument));

  response.status(200).json(searches);
});


service.get("/api-spec-json", (request: Request, response: Response) => {
  response.status(200).json(openapiSpec);
});

export const searches = functions
  .region("southamerica-east1")
  .https
  .onRequest(service);

