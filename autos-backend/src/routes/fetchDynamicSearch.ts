import express from "express";
import { pool } from "../dbConnect.js";
import { RowDataPacket } from "mysql2";
import { ICarInformationRequest } from "../interfaces/search/IRequestSearch.js";
import { SelectFieldEnums } from "../enums/SelectFieldEnums.js";

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


const statementInitialCount = "SELECT COUNT(c.carid) as count FROM cars c, models m, brands b, cargrants cg, cartypes ct, advertiseinfo ai, user u, person p, address ad, bundesland bl";

// disable autocommit and perform transaction
async function performQueryGet(req: express.Request, res: express.Response) {

    const { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo } = req.query;


    const modelStatement: Statements = { joinStatement: " c.modelid = m.modelid AND ", whereStatement: " m.modelid = ?", whereValue: modelid };
    const brandStatement: Statements = { joinStatement: " b.brandid = m.brandid AND ", whereStatement: " b.brandid = ?", whereValue: brandid };
    const carTypesStatement: Statements = { joinStatement: " ct.cartypeid = c.cartypeid AND ", whereStatement: " ct.cartypeid = ?", whereValue: cartypeid };
    const advertiseInfoStatement: Statements = { joinStatement: " c.advertiseinfoid = ai.advertiseinfoid AND ", whereStatement: "", whereValue: null };
    const userStatement: Statements = { joinStatement: " ai.userid = u.userid AND ", whereStatement: "", whereValue: null };
    const personStatement: Statements = { joinStatement: " u.userid = p.personid AND ", whereStatement: "", whereValue: null };
    const addressStatement: Statements = { joinStatement: " ad.addressid = p.addressid AND ", whereStatement: "", whereValue: null };
    const bundeslandStatement: Statements = { joinStatement: " bl.blandid = ad.blandid AND ", whereStatement: " bl.blandid = ?", whereValue: blandid };
    const cargrantStatement: Statements = { joinStatement: " cg.carid = c.carid AND cg.grantedpublic = 1", whereStatement: "", whereValue: null };

    const statements = { modelStatement, brandStatement, carTypesStatement, advertiseInfoStatement, userStatement, personStatement, addressStatement, bundeslandStatement, cargrantStatement }

    let query = statementInitialCount + " WHERE" + modelStatement.joinStatement + brandStatement.joinStatement + carTypesStatement.joinStatement
        + advertiseInfoStatement.joinStatement + userStatement.joinStatement + personStatement.joinStatement
        + addressStatement.joinStatement + bundeslandStatement.joinStatement + cargrantStatement.joinStatement;
    

    const whereValues = [];


    let connection;
    try {
        connection = await pool.getConnection();


        // no value or first value from select field 
        if (SelectFieldEnums.ALL_VALUE && modelid === SelectFieldEnums.ALL_VALUE &&
            price === SelectFieldEnums.ALL_VALUE && cartypeid === SelectFieldEnums.ALL_VALUE && dateFrom === undefined && dateTo === undefined) {
            console.log(query)
            console.log("###")
            const queryResult = await connection.execute(query);
            const result = queryResult as RowDataPacket[];
            const count = result[0][0].count;
            return res.status(200).json(count);
        } else {
            query = query;

            let i = 0;

            for (const [key1, value1] of Object.entries(statements)) {
                if (value1.whereValue === SelectFieldEnums.ALL_VALUE || value1.whereValue === "" || value1.whereValue === null) {

                } else {
                    i = i + 1;
                    query = query + value1.whereStatement + " AND";
                    whereValues.push(value1.whereValue);
                }
            }
            if (i < Object.entries(statements).length) {
                console.log("Länge sollte 8 sein: " + Object.entries(statements).length);
                query = query.substring(0, query.length - 4);
                console.log(query)
            } else {
                query = query.substring(0, query.length - 8);
                console.log(query)
            }

            const queryResult = await connection.execute(query, whereValues);
            const result = queryResult as RowDataPacket[];
            const count = result[0][0].count;
            return res.status(200).json(count);
        }



    } catch (error) {
        // Handle any errors
        console.log(error)
        return res.status(500).json({ message: 'Error occured.' })
    } finally {
        connection?.release();
    }

}

export default async (req: express.Request, res: express.Response) => {

    switch (req.method) {
        case 'GET':
            performQueryGet(req, res);
            break;
        case 'POST':
            const requestData: ICarInformationRequest = req.body;
            break;
        default:
            res.status(500).json({ message: "Error occured" })
    }
}

/*

    const modelStatement: Statements = { joinStatement: " JOIN models m ON c.modelid = m.modelid", whereStatement: " m.modelid = ?", whereValue: modelid };
    const cargrantStatement: Statements = { joinStatement: " JOIN cargrant cg ON cg.carid = c.carid", whereStatement: " cg.grantedpublic = ?", whereValue: 1 };
    const brandStatement: Statements = { joinStatement: " JOIN brands b ON b.brandid = m.brandid", whereStatement: " b.brandid = ?", whereValue: brandid };
    const carTypesStatement: Statements = { joinStatement: " JOIN cartypes ct ON ct.cartypeid = c.cartypeid", whereStatement: " ct.cartypeid = ?", whereValue: cartypeid };
    const advertiseInfoStatement: Statements = { joinStatement: " JOIN advertiseinfo ai ON c.advertiseinfoid = ai.advertiseinfoid", whereStatement: "", whereValue: null };
    const userStatement: Statements = { joinStatement: " JOIN user u ON ai.userid = u.userid", whereStatement: "", whereValue: null };
    const personStatement: Statements = { joinStatement: " JOIN person p ON u.userid = p.personid", whereStatement: "", whereValue: null };
    const addressStatement: Statements = { joinStatement: " JOIN address ad ON ad.addressid = p.addressid", whereStatement: "", whereValue: null };
    const bundeslandStatement: Statements = { joinStatement: " JOIN bundesland bl ON bl.blandid = ad.blandid", whereStatement: " bl.blandid = ?", whereValue: blandid };
*/