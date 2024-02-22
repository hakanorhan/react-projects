import express from "express";
async function performQuery(requestData: any, res: express.Response){
    res.status(200).json( { name: 'Marta' } );
}

export default async (req: express.Request, res: express.Response) => {
    const requestData: string = req.body;
    console.log(requestData);
    performQuery(requestData, res);

}