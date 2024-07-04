import express from "express";
import { connectToDatabase } from "../dbConnect.js";
const INSERT_INSERATE_FINISH: string = "UPDATE inserate SET entwurf = ? WHERE inserate_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const { finish, inserateid } = req.body;
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