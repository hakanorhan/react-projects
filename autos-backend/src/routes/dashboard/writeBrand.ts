import express from "express";
import performInsertBrand from "../../query/performInsertBrand.js";

const insertIntoBrand: string = "INSERT INTO brands (marke) VALUES (?)";
const selectBrandQuery: string = "SELECT * FROM brands";

export default async (req: express.Request, res: express.Response) => {
    const { value } = req.body;
    console.log(value + " writeBrand.ts")

    performInsertBrand(value, res, insertIntoBrand, selectBrandQuery);
}