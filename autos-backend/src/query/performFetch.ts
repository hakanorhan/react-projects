import { pool } from "../dbConnect.js";
import { RowDataPacket } from "mysql2";
import express, { Response } from 'express';

// disable autocommit and perform transaction
export default async function performFetch(res: express.Response, selectQuery: string){

    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0] as RowDataPacket[];
        const resultForSelect = result;
        console.log('++++++++++++++++');
        console.log(resultForSelect);
        console.log('++++++++++++++++');
        // Verwende res.json() anstatt res.send()
        return res.status(200).json({ message: 'Data send', tableValues: resultForSelect});
    } catch (error) {
        console.log("Error:", error);
        // Verwende res.status() und res.json(), um den Fehler zurückzugeben
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        // Stelle sicher, dass die Verbindung geschlossen wird
        connection.release();
    } 
};