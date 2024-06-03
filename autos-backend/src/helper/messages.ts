import express  from "express";
import { AxiosRejectPackage } from "../interfaces/IAxiosData.js";

export const insertMysqlErrorMessages = async (errno: number, res: express.Response) => {
    let axiosRejected : AxiosRejectPackage;
    switch(errno) {
        case 1062:
            axiosRejected = { messageId: errno.toString(), message: "Wert ist bereits vorhanden" }
            break;
        default:
            axiosRejected = { messageId: errno.toString(), message: "Bitte prüfen Sie Ihre Eingabe" }
    }
    console.log(axiosRejected.message + " " + axiosRejected.messageId)
    return res.status(409).json( axiosRejected );
    
}

export const selectMysqlErrorMessages = async function (errCode: string, res: express.Response ) {
    let axiosRejected: AxiosRejectPackage;
    switch(errCode) {
        case 'ER_PARSE_ERROR':
            // Abfragesyntax ungültig
             axiosRejected = { messageId: errCode, message: 'Bitte versuchen Sie es erneut' }
            return res.status(400).json( axiosRejected );
        case 'ER_NO_SUCH_TABLE':
            // Tabelle nicht gefunden
            axiosRejected = { messageId: errCode, message: 'Bitte versuchen Sie es erneut' }
            return res.status(404).json(axiosRejected);
        default:
            axiosRejected = { messageId: 'unknown', message: "Serverfehler. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut." }
            return res.status(500).json( axiosRejected );
        } 
}