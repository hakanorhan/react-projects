import { pool } from "../dbConnect.js";
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
const statementInitial = "SELECT COUNT(carid) as count FROM cars c";
const modelStatement = { joinStatement: " JOIN models m ON c.modelid = m.modelid", whereStatement: " WHERE m.model = 125" };
const brandStatement = { joinStatement: " JOIN brands b ON b.brandid = m.brandid", whereStatement: "" };
const carTypesStatement = { joinStatement: " JOIN cartypes ct ON ct.cartypeid = c.cartypeid", whereStatement: "" };
const advertiseInfoStatement = { joinStatement: " JOIN advertiseinfo ai ON c.advertiseinfoid = ai.advertiseinfoid", whereStatement: "" };
const userStatement = { joinStatement: " JOIN user u ON ai.userid = u.userid", whereStatement: "" };
const personStatement = { joinStatement: " JOIN person p ON u.userid = p.personid", whereStatement: "" };
const addressStatement = { joinStatement: " JOIN address ad ON ad.addressid = p.addressid", whereStatement: "" };
const bundeslandStatement = { joinStatement: " JOIN bundesland bl ON bl.blandid = ad.blandid", whereStatement: "" };
async function performQueryGet(req, res) {
    const { brandId, modelId, price, carTypeId, blandId, dateFrom, dateTo } = req.query;
    const query = statementInitial + modelStatement.joinStatement + brandStatement.joinStatement + carTypesStatement.joinStatement
        + advertiseInfoStatement.joinStatement + userStatement.joinStatement + personStatement.joinStatement
        + addressStatement.joinStatement + bundeslandStatement.joinStatement + " WHERE b.brandid = ?";
    console.log(query);
    const beispiel = req.query;
    console.log(beispiel);
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.execute(query, [brandId]);
        const result = queryResult;
        const count = result[0][0].count;
        return res.status(200).json(count);
    }
    catch (error) {
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
