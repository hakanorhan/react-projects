import { pool } from "../dbConnect.js";
import { verifyUser } from "../jwt/authenticate.js";
const INSERT_INTO_ADVERTISEINFO = "INSERT INTO advertiseinfo (userid) VALUES(?)";
const INSERT_INTO_CARS = "INSERT INTO cars(modelid, price, km, cartypeid, year, month, transmissionid, advertiseinfoid, fuelid, ps, hubraum, doorid, previousowner, aunew, hunew, accident ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
export default async (req, res) => {
    const accessToken = req.cookies.jwt;
    const userId = verifyUser(accessToken);
    const data = req.body;
    console.log(data.inserateData.year);
    performQuery(data, userId, res);
};
async function performQuery(data, userId, res) {
    const inserateSelect = data.inserateSelect;
    const inserateData = data.inserateData;
    const inserateCheckBox = data.inserateCheckbox;
    console.log(inserateCheckBox.unfallFahrzeug);
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [resultAdvertise] = await connection.execute(INSERT_INTO_ADVERTISEINFO, [userId]);
        const advertiseId = resultAdvertise.insertId;
        await connection.execute(INSERT_INTO_CARS, [inserateSelect.model, inserateData.price, inserateData.km, inserateSelect.cartype, inserateData.year, inserateData.month,
            inserateSelect.transmissionname, advertiseId, inserateSelect.fuelname, inserateData.ps, inserateData.hubraum, inserateSelect.doors, inserateData.previousOwner,
            inserateCheckBox.auNew, inserateCheckBox.huNew, inserateCheckBox.unfallFahrzeug]);
        await connection.commit();
        console.log("committed!");
    }
    catch (err) {
        await connection.rollback();
        console.log(err);
    }
    finally {
        connection.release();
    }
}
