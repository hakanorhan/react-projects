import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { AxiosDetailsearch } from '../interfaces/IAxiosData.js';

const selectQueryDetail: string = "SELECT c.carid, b.brand, m.model, c.price, ct.cartype, c.km, c.year, c.month, t.transmissionname, ai.advertiseddate, c.ps, c.previousowner, c.hubraum,"
    + " c.aunew, d.doors, c.hunew, c.accident, f.fuelname, u.iscardealer, k.klimaname, c.description, c.scheckheft, c.fittodrive, c.abstandstempomat,"
    + " c.ambientbeleuchtung, c.headupdisplay, c.totwinkelassistent" 
    + " FROM cars c "
    + " JOIN models m ON c.modelid = m.modelid"
    + " JOIN brands b ON b.brandid = m.brandid"
    + " JOIN cartypes ct ON c.cartypeid = ct.cartypeid"
    + " JOIN transmissions t ON t.transmissionid = c.transmissionid"
    + " JOIN advertiseinfo ai ON c.advertiseinfoid = ai.advertiseinfoid"
    + " JOIN fuels f ON f.fuelid = c.fuelid"
    + " JOIN doors d ON d.doorid = c.doorid"
    + " JOIN user u ON u.userid = ai.userid"
    + " JOIN klima k ON c.klimaid = k.klimaid"
    + " WHERE c.carid = ?";

export default async (req: express.Request, res: express.Response) => {
    const carId = req.params.id
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryDetail, [carId]);
        const result = queryResult[0] as RowDataPacket[];
        const { carid, brand, model, price, cartype, km,year, month, transmissionname, advertiseddate, ps, previousowner, hubraum, aunew, hunew, doors, accident, fuelname,
             iscardealer, klimaname, description, scheckheft, fittodrive, abstandstempomat, ambientbeleuchtung, headupdisplay, totwinkelassistent } = result[0];
        
        const axiosData: AxiosDetailsearch = {
            carId: carid, model, brand, price, cartype, km, year, month, transmission: transmissionname, advertiseddate, ps, previousOwner: previousowner, hubraum, auNew: aunew,
            huNew: hunew, doors, accident, fuel:fuelname, isCardealer: iscardealer, klima: klimaname, description, scheckheft, fittodrive, abstandstempomat, ambientbeleuchtung,
            headupdisplay, totwinkelassistent
        }

        return res.status(200).json( axiosData );
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        connection.release();
    } 
}