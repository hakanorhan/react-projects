import { connectToDatabase } from "../../dbConnect.js";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
const insertIntoBrand = "INSERT INTO brand (brand) VALUES (?)";
const selectBrandQuery = "SELECT * FROM brand";
import { formularNameValid } from "../../helper/validHelper.js";
export default async (req, res) => {
    const { value } = req.body;
    if (!formularNameValid(value)) {
        insertMysqlErrorMessages(1, res);
    }
    else {
        console.log(value);
        let connection;
        try {
            connection = await connectToDatabase();
            await connection.beginTransaction();
            const [resultBrand] = await connection.execute(insertIntoBrand, [value]);
            const insertId = resultBrand.insertId;
            const queryResult = await connection.query(selectBrandQuery);
            const result = queryResult[0];
            const brands = result.map((row) => {
                const object = {
                    brandId: row.brand_id,
                    brand: row.brand
                };
                return object;
            });
            const axiosDataPacket = { message: "Erfolgreich hinzugefügt", dataBrands: brands };
            await connection.commit();
            connection.end();
            return res.status(200).json(axiosDataPacket);
        }
        catch (error) {
            connection?.rollback();
            connection?.end();
            insertMysqlErrorMessages(error.errno, res);
        }
    }
};
