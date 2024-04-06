import express from "express";
import { pool } from "../dbConnect.js";
import { RowDataPacket } from "mysql2";
import { ICarInformationRequest } from "../interfaces/search/IRequestSearch.js";

enum E {
    CARS_LONG = "cars", CARS_SHORT = "c", CAR_ID = "carid",
    MODELS_LONG = "models", MODELS_SHORT = "m", MODEL_NAME = "model", MODEL_ID = "modelid",
    BRANDS_LONG = "brands", BRANDS_SHORT = "b", BRAND_NAME = "brand", BRAND_ID = "brandid",
    CARTYPES_LONG = "cartypes", CARTYPES_SHORT = "ct", CARTYPE_NAME = "cartype", CARTYPE_ID = "cartypeid",
    BUNDESLAND_LONG = "bundesland", BUNDESLAND_SHORT = "bl", BUNDESLAND_NAME = "bundesland", BUNDESLAND_ID = "blandid",
    ADVERTISEINFO_LONG = "advertiseinfo", ADVERTISEINFO_SHORT = 'ai', ADVERTISEINFO_NAME = "advertiseinfo", ADVERTISEINFO_ID = "advertiseinfoid"
}

interface Statements {
    joinStatement: string,
    whereStatement: string
}


const statementInitial = "SELECT COUNT(carid) as count FROM cars c";
const modelStatement: Statements = { joinStatement: " JOIN models m ON c.modelid = m.modelid", whereStatement: " WHERE m.model = 125" };
const brandStatement: Statements = { joinStatement: " JOIN brands b ON b.brandid = m.brandid", whereStatement: "" };
const carTypesStatement: Statements = { joinStatement: " JOIN cartypes ct ON ct.cartypeid = c.cartypeid", whereStatement: "" };
const advertiseInfoStatement: Statements = { joinStatement: " JOIN advertiseinfo ai ON c.advertiseinfoid = ai.advertiseinfoid", whereStatement:"" };
const userStatement: Statements = { joinStatement: " JOIN user u ON ai.userid = u.userid", whereStatement: "" };
const personStatement: Statements = { joinStatement: " JOIN person p ON u.userid = p.personid" , whereStatement: ""};
const addressStatement: Statements = { joinStatement: " JOIN address ad ON ad.addressid = p.addressid", whereStatement: "" };
const bundeslandStatement: Statements = { joinStatement: " JOIN bundesland bl ON bl.blandid = ad.blandid", whereStatement: "" };

// disable autocommit and perform transaction
async function performQueryGet(req: express.Request, res: express.Response){

    const { brandId, modelId, price, carTypeId, blandId, dateFrom, dateTo } = req.query;


    const query =  statementInitial + modelStatement.joinStatement + brandStatement.joinStatement + carTypesStatement.joinStatement 
    + advertiseInfoStatement.joinStatement + userStatement.joinStatement + personStatement.joinStatement 
    + addressStatement.joinStatement + bundeslandStatement.joinStatement + " WHERE b.brandid = ?";

    console.log(query);

    const beispiel: Record<string, any> = req.query;
    console.log(beispiel);

    let connection;
    try {
        connection = await pool.getConnection();
        
        const queryResult = await connection.execute(query, [brandId]);
        const result = queryResult as RowDataPacket[];
            const count = result[0][0].count;
            return res.status(200).json( count );
        
            
      }catch (error) {
        // Handle any errors
        return res.status(500).json({message:'Error occured.'})
    } finally {
        connection?.release();
    }
    
}

export default async (req: express.Request, res: express.Response) => {
    
    switch(req.method) {
        case 'GET' :
            performQueryGet(req, res);
            break;
        case 'POST':
            const requestData: ICarInformationRequest = req.body;
            break;
            default:
                res.status(500).json({ message: "Error occured" })
    }
}