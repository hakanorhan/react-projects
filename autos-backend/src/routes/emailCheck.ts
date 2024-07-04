import express from "express";
import { RowDataPacket } from "mysql2";
import { REGEX_EMAIL } from "../regex/regex.js";
import { connectToDatabase } from "../dbConnect.js";
const selectQuery: string = 'SELECT email FROM account_data WHERE email = ?';

// disable autocommit and perform transaction
async function performQuery(requestData: string, res: express.Response) {

    let connection;

    // Email or password aren't valid
    if (!REGEX_EMAIL.test(requestData)) {
        return res.status(401).json({ message: 'Email ist nicht korrekt' })
    } else {

        try {
            connection = await connectToDatabase();

            // query Email
            const queryResult = await connection.query(selectQuery, [requestData]);
            const result = queryResult as RowDataPacket[];

            // Email not found
            if (result[0].length === 0) {
                connection.end();
                return res.status(200).json({ message: 'Email ist verfügbar.' });
            } else {
                connection.end();
                return res.status(401).json({ message: 'Email ist bereits vorhanden.' });
            }

        } catch (error) {
            // Handle any errors
            connection?.end();
            return res.status(500).json({ message: 'Interner Server Fehler. Bitte versuchen Sie es später erneut.' });
        }
    }

}

export default async (req: express.Request, res: express.Response) => {
    const { value } = req.body;
    performQuery(value, res);

}