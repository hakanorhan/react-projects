import { pool } from "../dbConnect.js";
import { verifyUserJwt } from "../jwt/authenticate.js";
const INSERT_INTO_ADVERTISEINFO = "INSERT INTO advertiseinfo (userid) VALUES(?)";
const INSERT_INTO_CARS = "INSERT INTO cars(modelid, price, km, cartypeid, year, month, transmissionid, advertiseinfoid, fuelid, ps, hubraum, doorid, previousowner, aunew, hunew, accident ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const INSERT_INTO_CARGRANTS = "INSERT INTO cargrants (carid) VALUES(?)";
export default async (req, res) => {
    const accessToken = req.cookies.jwt;
    console.log("Wird öfters ausgeführt!");
    const token = await verifyUserJwt(accessToken);
    const data = req.body;
    console.log(data.inserateSelect.brand + " " + data.inserateSelect.model);
    performQuery(data, token.id, res);
};
async function performQuery(data, userId, res) {
    const inserateSelect = data.inserateSelect;
    const inserateData = data.inserateData;
    const inserateCheckBox = data.inserateCheckbox;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [resultAdvertise] = await connection.execute(INSERT_INTO_ADVERTISEINFO, [userId]);
        const advertiseId = resultAdvertise.insertId;
        const [resultCarId] = await connection.execute(INSERT_INTO_CARS, [inserateSelect.model, inserateData.price, inserateData.km, inserateSelect.cartype, inserateData.year, inserateData.month,
            inserateSelect.transmissionname, advertiseId, inserateSelect.fuelname, inserateData.ps, inserateData.hubraum, inserateSelect.doors, inserateData.previousOwner,
            inserateCheckBox.auNew, inserateCheckBox.huNew, inserateCheckBox.unfallFahrzeug]);
        const carId = resultCarId.insertId;
        await connection.execute(INSERT_INTO_CARGRANTS, [carId]);
        const axiosData = { carId: carId, message: 'succes' };
        await connection.commit();
        return res.status(200).json(axiosData);
    }
    catch (err) {
        await connection.rollback();
        console.log(err);
    }
    finally {
        connection.release();
    }
}
