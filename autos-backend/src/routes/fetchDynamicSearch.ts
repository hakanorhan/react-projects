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
    whereStatement: string,
    whereValue: string | any | null
}


const statementInitialCount = "SELECT COUNT(carid) as count FROM cars c";

// disable autocommit and perform transaction
async function performQueryGet(req: express.Request, res: express.Response){

    const { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo } = req.query;


    const modelStatement: Statements = { joinStatement: " JOIN models m ON c.modelid = m.modelid", whereStatement: " m.modelid = ?", whereValue: modelid };
    const brandStatement: Statements = { joinStatement: " JOIN brands b ON b.brandid = m.brandid", whereStatement: " b.brandid = ?", whereValue: brandid };
    const carTypesStatement: Statements = { joinStatement: " JOIN cartypes ct ON ct.cartypeid = c.cartypeid", whereStatement: " ct.cartypeid = ?", whereValue: cartypeid };
    const advertiseInfoStatement: Statements = { joinStatement: " JOIN advertiseinfo ai ON c.advertiseinfoid = ai.advertiseinfoid", whereStatement:" ai.advertiseinfoid = ?", whereValue: null };
    const userStatement: Statements = { joinStatement: " JOIN user u ON ai.userid = u.userid", whereStatement: " u.userid = ?", whereValue: null };
    const personStatement: Statements = { joinStatement: " JOIN person p ON u.userid = p.personid" , whereStatement: " p.personid = ?", whereValue: null};
    const addressStatement: Statements = { joinStatement: " JOIN address ad ON ad.addressid = p.addressid", whereStatement: " ad.addressid = ?", whereValue: null };
    const bundeslandStatement: Statements = { joinStatement: " JOIN bundesland bl ON bl.blandid = ad.blandid", whereStatement: " bl.blandid = ?", whereValue: blandid };

    const statements = { modelStatement, brandStatement, carTypesStatement, advertiseInfoStatement, userStatement, personStatement, addressStatement, bundeslandStatement }

    let query =  statementInitialCount + modelStatement.joinStatement + brandStatement.joinStatement + carTypesStatement.joinStatement 
    + advertiseInfoStatement.joinStatement + userStatement.joinStatement + personStatement.joinStatement 
    + addressStatement.joinStatement + bundeslandStatement.joinStatement;

    const whereValues = [];


    let connection;
    try {
        connection = await pool.getConnection();
        
        console.log("dateFrom: " + dateFrom)
        if(brandid === "" && modelid === "" && price === "0" && cartypeid === "" && dateFrom === undefined && dateTo === undefined) {
        const queryResult = await connection.execute(query);
        const result = queryResult as RowDataPacket[];
            const count = result[0][0].count;
            return res.status(200).json( count );
        } else {
            query = query + " WHERE";
            
                for(const [key1, value1] of Object.entries(statements)) {
                    
                    if(value1.whereValue) {
                        query = query + value1.whereStatement + " AND";
                        whereValues.push(value1.whereValue);
                    }
                }
                
                query = query.substring(0, query.length - 4);



            console.log(query)
            console.log("")

            const queryResult = await connection.execute(query, whereValues);
            const result = queryResult as RowDataPacket[];
            const count = result[0][0].count;
            return res.status(200).json( count );
        }
        
            
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