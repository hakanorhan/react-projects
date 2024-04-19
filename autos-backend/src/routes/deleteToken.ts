import express from "express";

export default async (req: express.Request, res: express.Response) => {
    console.log("Hallo Ausgabe!")
    res.cookie('jwt', '', { expires: new Date(0) });
    res.status(200).json('Logout erfolgreich');

}