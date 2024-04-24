import { pool } from "../dbConnect.js";
import { verifyUserJwt } from "../jwt/checkAuth.js";
const INSERT_INSERATE_INFO = "INSERT INTO inserate_info (user_id) VALUES(?)";
const INSERT_INSERATE_CHECK = "INSERT INTO inserate_check (inserate_id) VALUES(?)";
const INSERT_TUEV = "INSERT INTO tuev (hu_new, au_new, scheckheft) VALUES(?, ?, ?)";
const INSERT_VEHICLE_CONDITION = "INSERT INTO vehicle_condition (accident, fit_to_drive) VALUES(?, ?)";
const INSERT_INTO_TECH_DESCRIPTION = "INSERT INTO technical_description (power_ps, mileage_km, cartype_id, registration_year, registration_month, transmission_id, fuel_id, cubic_capacity, door_id, vehicle_owners, tuev_id, color, clima_id, vehicle_condition_id, description_car, feature_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const INSERT_INSERATE = "INSERT INTO inserate (price, model_id, technical_description_id, inserate_info_id) VALUES(?, ?, ?, ?)";
const INSERT_FEATURE = "INSERT INTO feature (abstandstempomat, ambientbeleuchtung, headupdisplay, totwinkelassistent) VALUES(?, ?, ?, ?)";
export default async (req, res) => {
    const accessToken = req.cookies.jwt;
    const token = await verifyUserJwt(accessToken);
    const data = req.body;
    performQuery(data, token.id, res);
};
async function performQuery(data, userId, res) {
    const inserateSelect = data.inserateSelect;
    const inserateData = data.inserateData;
    const inserateCheckBox = data.inserateCheckbox;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [resultInserateInfo] = await connection.execute(INSERT_INSERATE_INFO, [userId]);
        const inserateInfoId = resultInserateInfo.insertId;
        const [resultTuev] = await connection.execute(INSERT_TUEV, [inserateCheckBox.huNew, inserateCheckBox.auNew, inserateCheckBox.scheckheft]);
        const tuevId = resultTuev.insertId;
        const [resultVehicleCondition] = await connection.execute(INSERT_VEHICLE_CONDITION, [inserateCheckBox.unfallFahrzeug, inserateCheckBox.fittodrive]);
        const vehicleConditionId = resultVehicleCondition.insertId;
        const [resultFeature] = await connection.execute(INSERT_FEATURE, [inserateCheckBox.abstandstempomat, inserateCheckBox.ambientbeleuchtung, inserateCheckBox.headupdisplay, inserateCheckBox.totwinkelassistent]);
        const featureId = resultFeature.insertId;
        const [resultTechDescription] = await connection.execute(INSERT_INTO_TECH_DESCRIPTION, [inserateData.ps, inserateData.km, inserateSelect.cartype, inserateData.year, inserateData.month, inserateSelect.transmission, inserateSelect.fuel,
            inserateData.hubraum, inserateSelect.door, inserateData.previousOwner, tuevId, inserateData.color, data.klima, vehicleConditionId, inserateData.description, featureId]);
        const techDescriptionId = resultTechDescription.insertId;
        const [resultInserate] = await connection.execute(INSERT_INSERATE, [inserateData.price, inserateSelect.model, techDescriptionId, inserateInfoId]);
        const inserateId = resultInserate.insertId;
        await connection.execute(INSERT_INSERATE_CHECK, [inserateId]);
        const axiosData = { carId: inserateId, message: 'succes' };
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
