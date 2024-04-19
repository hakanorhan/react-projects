import { pool } from "../dbConnect.js";
import { SelectFieldEnums } from "../enums/SelectFieldEnums.js";
var E;
(function (E) {
    E["CARS_LONG"] = "cars";
    E["CARS_SHORT"] = "c";
    E["CAR_ID"] = "carid";
    E["MODELS_LONG"] = "models";
    E["MODELS_SHORT"] = "m";
    E["MODEL_NAME"] = "model";
    E["MODEL_ID"] = "modelid";
    E["BRANDS_LONG"] = "brands";
    E["BRANDS_SHORT"] = "b";
    E["BRAND_NAME"] = "brand";
    E["BRAND_ID"] = "brandid";
    E["CARTYPES_LONG"] = "cartypes";
    E["CARTYPES_SHORT"] = "ct";
    E["CARTYPE_NAME"] = "cartype";
    E["CARTYPE_ID"] = "cartypeid";
    E["BUNDESLAND_LONG"] = "bundesland";
    E["BUNDESLAND_SHORT"] = "bl";
    E["BUNDESLAND_NAME"] = "bundesland";
    E["BUNDESLAND_ID"] = "blandid";
    E["ADVERTISEINFO_LONG"] = "advertiseinfo";
    E["ADVERTISEINFO_SHORT"] = "ai";
    E["ADVERTISEINFO_NAME"] = "advertiseinfo";
    E["ADVERTISEINFO_ID"] = "advertiseinfoid";
})(E || (E = {}));
const statementInitialCount = "SELECT COUNT(c.carid) as count FROM cars c, models m, brands b, cargrants cg, cartypes ct, advertiseinfo ai, user u, person p, address ad, bundesland bl";
async function performQueryGet(req, res) {
    const { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo } = req.query;
    const modelStatement = { joinStatement: " c.modelid = m.modelid AND ", whereStatement: " m.modelid = ?", whereValue: modelid };
    const brandStatement = { joinStatement: " b.brandid = m.brandid AND ", whereStatement: " b.brandid = ?", whereValue: brandid };
    const carTypesStatement = { joinStatement: " ct.cartypeid = c.cartypeid AND ", whereStatement: " ct.cartypeid = ?", whereValue: cartypeid };
    const advertiseInfoStatement = { joinStatement: " c.advertiseinfoid = ai.advertiseinfoid AND ", whereStatement: "", whereValue: null };
    const userStatement = { joinStatement: " ai.userid = u.userid AND ", whereStatement: "", whereValue: null };
    const personStatement = { joinStatement: " u.userid = p.personid AND ", whereStatement: "", whereValue: null };
    const addressStatement = { joinStatement: " ad.addressid = p.addressid AND ", whereStatement: "", whereValue: null };
    const bundeslandStatement = { joinStatement: " bl.blandid = ad.blandid AND ", whereStatement: " bl.blandid = ?", whereValue: blandid };
    const cargrantStatement = { joinStatement: " cg.carid = c.carid AND cg.grantedpublic = 1", whereStatement: "", whereValue: null };
    const statements = { modelStatement, brandStatement, carTypesStatement, advertiseInfoStatement, userStatement, personStatement, addressStatement, bundeslandStatement, cargrantStatement };
    let query = statementInitialCount + " WHERE" + modelStatement.joinStatement + brandStatement.joinStatement + carTypesStatement.joinStatement
        + advertiseInfoStatement.joinStatement + userStatement.joinStatement + personStatement.joinStatement
        + addressStatement.joinStatement + bundeslandStatement.joinStatement + cargrantStatement.joinStatement;
    const whereValues = [];
    let connection;
    try {
        connection = await pool.getConnection();
        if (SelectFieldEnums.ALL_VALUE && modelid === SelectFieldEnums.ALL_VALUE &&
            price === SelectFieldEnums.ALL_VALUE && cartypeid === SelectFieldEnums.ALL_VALUE && dateFrom === undefined && dateTo === undefined) {
            console.log(query);
            console.log("###");
            const queryResult = await connection.execute(query);
            const result = queryResult;
            const count = result[0][0].count;
            return res.status(200).json(count);
        }
        else {
            query = query;
            let i = 0;
            for (const [key1, value1] of Object.entries(statements)) {
                if (value1.whereValue === SelectFieldEnums.ALL_VALUE || value1.whereValue === "" || value1.whereValue === null) {
                }
                else {
                    i = i + 1;
                    query = query + value1.whereStatement + " AND";
                    whereValues.push(value1.whereValue);
                }
            }
            if (i < Object.entries(statements).length) {
                console.log("Länge sollte 8 sein: " + Object.entries(statements).length);
                query = query.substring(0, query.length - 4);
                console.log(query);
            }
            else {
                query = query.substring(0, query.length - 8);
                console.log(query);
            }
            const queryResult = await connection.execute(query, whereValues);
            const result = queryResult;
            const count = result[0][0].count;
            return res.status(200).json(count);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occured.' });
    }
    finally {
        connection?.release();
    }
}
export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            performQueryGet(req, res);
            break;
        case 'POST':
            const requestData = req.body;
            break;
        default:
            res.status(500).json({ message: "Error occured" });
    }
};
