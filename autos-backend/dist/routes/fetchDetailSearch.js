import { connectToDatabase } from '../dbConnect1.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';
import { Roles } from '../enums/Roles.js';
const selectQueryDetail = "SELECT *"
    + " FROM inserate i "
    + " LEFT JOIN inserate_info ii ON ii.inserate_info_id = i.inserate_info_id"
    + " LEFT JOIN inserate_check ic ON i.inserate_id = ic.inserate_id"
    + " LEFT JOIN user u ON u.user_id = ii.user_id"
    + " LEFT JOIN user_dealer ud ON ud.user_id = u.user_id"
    + " LEFT JOIN personal_data pd ON pd.personal_data_id = u.personal_data_id"
    + " LEFT JOIN account_data ac ON ac.account_data_id = u.account_data_id"
    + " LEFT JOIN address a ON a.address_id = pd.address_id"
    + " LEFT JOIN federal_state fs ON fs.federal_state_id = a.federal_state_id"
    + " LEFT JOIN contact_preffered cp ON cp.contact_preffered_id = u.contact_preffered_id"
    + " LEFT JOIN model m ON m.model_id = i.model_id"
    + " LEFT JOIN brand b ON b.brand_id = m.brand_id"
    + " LEFT JOIN technical_description td ON td.technical_description_id = i.technical_description_id"
    + " LEFT JOIN fuel f ON td.fuel_id = f.fuel_id"
    + " LEFT JOIN door d ON d.door_id = td.door_id"
    + " LEFT JOIN vehicle_condition vc ON vc.vehicle_condition_id = td.vehicle_condition_id"
    + " LEFT JOIN cartype ct ON ct.cartype_id = td.cartype_id"
    + " LEFT JOIN feature fe ON fe.feature_id = td.feature_id"
    + " LEFT JOIN transmission tr ON tr.transmission_id = td.transmission_id"
    + " LEFT JOIN clima c ON c.clima_id = td.clima_id"
    + " LEFT JOIN tuev t ON t.tuev_id = td.tuev_id"
    + " WHERE i.inserate_id = ?";
const updateClick = "UPDATE inserate SET clicks = clicks+ 1  WHERE inserate_id = ?";
export default async (req, res) => {
    const inserateId = req.params.id;
    const user = req.user;
    const role = user.role;
    let connection;
    try {
        connection = await connectToDatabase();
        if (role === Roles.USER)
            await connection.execute(updateClick, [inserateId]);
        const queryResult = await connection.execute(selectQueryDetail, [inserateId]);
        const result = queryResult[0];
        const { inserate_id, brand, model, price, cartype, mileage_km, registration_year, registration_month, transmission, inserate_date, power_ps, vehicle_owners, cubic_capacity, au_new, hu_new, door, accident, fuel, is_car_dealer, clima, description_car, scheckheft, fit_to_drive, abstandstempomat, ambientbeleuchtung, headupdisplay, totwinkelassistent, color, city, federal_state, zipcode } = result[0];
        const axiosPaper = { inseratId: inserate_id, mileageKm: mileage_km, registrationYear: registration_year, registrationMonth: registration_month, psPower: power_ps, vehicleOwners: vehicle_owners, fuel, accident, city };
        const axiosData = {
            inseratId: inserate_id, model, brand, price, cartype, transmission, axiosPaper, inserateDate: inserate_date, cubicCapacity: cubic_capacity, auNew: au_new,
            huNew: hu_new, doors: door, isCardealer: is_car_dealer, clima, description: description_car, scheckheft, fittodrive: fit_to_drive, abstandstempomat, ambientbeleuchtung,
            headupdisplay, totwinkelassistent, color, city, federalState: federal_state, zipcode
        };
        connection.end();
        return res.status(200).json(axiosData);
    }
    catch (error) {
        console.log("Error:", error);
        selectMysqlErrorMessages(error.code, res);
        connection?.end();
    }
};
