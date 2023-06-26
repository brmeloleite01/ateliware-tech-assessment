import * as functions from "firebase-functions";
import express, {Request, Response} from "express";

import {RouteOptimization} from "./service/RouteOptimization";
import {ObjectsPosition} from "./types/ObjectsPosition";
import {PossiblePathesAPI} from "./service/PossiblePathesAPI";
import {FastestStrategy} from "./service/strategy/FastestStrategy";
import {Route} from "./types/Route";
import * as openapiSpec from "./route-optimization-specification.json";

const service = express();
service.use(express.json());


service.post("/fastest", async (request: Request, response: Response ) => {
  const {drone, start, end} = request.body as ObjectsPosition;
  const possiblePathes = await PossiblePathesAPI.fetchAll();

  const fastestRoute: Route = await new RouteOptimization(possiblePathes)
    .useStrategy(new FastestStrategy())
    .optimize(drone, start)
    .optimize(start, end)
    .get();


  response.status(200).json(fastestRoute);
});

service.get('/api-spec-json', (request: Request, response: Response) => {
  response.status(200).json(openapiSpec)
});


export const routeOptimization = functions
  .region("southamerica-east1")
  .https
  .onRequest(service);
