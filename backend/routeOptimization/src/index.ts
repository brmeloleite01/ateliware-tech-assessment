import * as functions from "firebase-functions";

import express, { Request, Response} from 'express'

const service = express()

service.use(express.json())

service.post("", (request: Request, response: Response ) => {
    response.status(200).json({
        message: "function is on!"
    })
})

export const routeOptimization = functions
                                    .region('southamerica-east1')
                                    .https
                                    .onRequest(service)