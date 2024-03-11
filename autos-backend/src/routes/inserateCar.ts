import express from "express";
async function performQuery(requestData: any, res: express.Response){
    res.status(200).json( { name: 'Guten Tag Hakan' } );
}

export default async (req: express.Request, res: express.Response) => {
    const requestData: string = req.body;
    performQuery(requestData, res);
}