import performFetch from "../../query/performFetch.js";
import express from 'express';
const selectQuery: string = 'SELECT * FROM brands';

export default async (req: express.Request, res: express.Response) => {
    performFetch(res, selectQuery);
}