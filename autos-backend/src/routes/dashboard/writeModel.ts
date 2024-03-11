import express from "express";
import performInsert from "../../query/performInsertBrand.js";

const insertIntoBrand: string = "INSERT INTO model (modelname, brandid) VALUES (?, ?)";
const selectBrandQuery: string = "SELECT * FROM models";

export default async (req: express.Request, res: express.Response) => {
    const { value } = req.body;
    console.log(value)
    //performInsert(value, res, insertIntoBrand, selectBrandQuery);
}