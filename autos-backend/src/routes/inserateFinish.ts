import express from "express";
import { ResultSetHeader } from "mysql2";
import { connectToDatabase } from "../dbConnect.js";
import { AxiosDataInserate as AxiosDataInserateRequest, AxiosInserateResponse } from "../interfaces/IAxiosData.js";
import { insertMysqlErrorMessages } from "../helper/messages.js";

const INSERT_INSERATE_FINISH: string = "UPDATE inserate SET entwurf = ? WHERE inserate_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const { finish, inserateid } = req.body;
    console.log("inserate finish: " + finish)
    //const userId = (req.user as any).id;
    if(finish === 0 || finish === 1)
    performUpdate(finish, inserateid, res);
    else res.status(400).json({message: 'Ungültiger Wert'}); 
}


async function performUpdate(finish: number, inserateId: any, res: express.Response) {
    let connection;
    try {
        connection = await connectToDatabase();

       await connection.execute(INSERT_INSERATE_FINISH, [finish, inserateId]);

        connection.end();
        return res.status(200).json( { message: 'Erfolgreich hinzugefügt' } )
        
    } catch(error: any) {
        // rollback
        await connection?.rollback();
        console.log(error);
        connection?.end();
        return res.status(500).json({ message: 'Es ist ein Fehler aufgetreten. Die Daten wurden als Entwurf gespeichert.' }); 
    } 
}