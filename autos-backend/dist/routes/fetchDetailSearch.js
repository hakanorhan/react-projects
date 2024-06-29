import { connectToDatabase } from '../dbConnect.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';
import { formularIsNumber } from '../helper/validHelper.js';
import { Roles } from '../constants/values.js';
const updateClick = "UPDATE inserate i "
    + " JOIN inserate_check ic ON i.inserate_id = ic.inserate_id"
    + " JOIN inserate_info ii ON i.inserate_info_id = ii.inserate_info_id"
    + " SET clicks = clicks+ 1"
    + " WHERE i.inserate_id = ? AND ic.inserate_public = 1 AND ii.is_active = 1";
;
export default async (req, res) => {
    const inserateId = req.params.id;
    let conditionRole;
    let role = Roles.NULL;
    if (req.user) {
        role = req.user.role;
        conditionRole = (role === Roles.ADMIN
            ? "AND ic.inserate_public = 0"
            : "AND ic.inserate_public = 1");
    }
    else {
        conditionRole = "AND ic.inserate_public = 1";
    }
    let selectQuery = `SELECT *, YEAR(ac.created_date) AS since`
        + ` FROM inserate i `
        + ` LEFT JOIN inserate_info ii ON ii.inserate_info_id = i.inserate_info_id`
        + ` LEFT JOIN inserate_check ic ON i.inserate_id = ic.inserate_id`
        + ` LEFT JOIN user u ON u.user_id = ii.user_id`
        + ` LEFT JOIN user_dealer ud ON ud.user_id = u.user_id`
        + ` LEFT JOIN personal_data pd ON pd.personal_data_id = u.personal_data_id`
        + ` LEFT JOIN account_data ac ON ac.account_data_id = u.account_data_id`
        + ` LEFT JOIN address a ON a.address_id = pd.address_id`
        + ` LEFT JOIN federal_state fs ON fs.federal_state_id = a.federal_state_id`
        + ` LEFT JOIN contact_preffered cp ON cp.contact_preffered_id = u.contact_preffered_id`
        + ` LEFT JOIN model m ON m.model_id = i.model_id`
        + ` LEFT JOIN brand b ON b.brand_id = m.brand_id`
        + ` LEFT JOIN technical_description td ON td.technical_description_id = i.technical_description_id`
        + ` LEFT JOIN fuel f ON td.fuel_id = f.fuel_id`
        + ` LEFT JOIN door d ON d.door_id = td.door_id`
        + ` LEFT JOIN vehicle_condition vc ON vc.vehicle_condition_id = td.vehicle_condition_id`
        + ` LEFT JOIN cartype ct ON ct.cartype_id = td.cartype_id`
        + ` LEFT JOIN feature fe ON fe.feature_id = td.feature_id`
        + ` LEFT JOIN transmission tr ON tr.transmission_id = td.transmission_id`
        + ` LEFT JOIN clima c ON c.clima_id = td.clima_id`
        + ` LEFT JOIN tuev t ON t.tuev_id = td.tuev_id`
        + ` WHERE i.inserate_id = ? AND i.entwurf = 0 ${conditionRole}`;
    let query = `SELECT i.*, ii.*, ic.*, ud.*, a.*, fs.*, cp.*, m.*, b.*, td.*, f.*, d.*, vc.*, ct.*, fe.*, tr.*, c.*, t.*, pd.*, YEAR(ac.created_date) AS since
    FROM inserate i, inserate_info ii, inserate_check ic, user u LEFT JOIN user_dealer ud ON ud.user_id = u.user_id,  personal_data pd, account_data ac, address a, federal_state fs, contact_preffered cp, model m, brand b, technical_description td, fuel f, door d, vehicle_condition vc, cartype ct, feature fe, transmission tr, clima c, tuev t
    WHERE i.inserate_id = ? 
      AND i.entwurf = 0 
      ${conditionRole}
      AND ii.inserate_info_id = i.inserate_info_id 
      AND ic.inserate_id = i.inserate_id
      AND u.user_id = ii.user_id 
      AND pd.personal_data_id = u.personal_data_id 
      AND ac.account_data_id = u.account_data_id 
      AND a.address_id = pd.address_id 
      AND fs.federal_state_id = a.federal_state_id 
      AND cp.contact_preffered_id = u.contact_preffered_id 
      AND m.model_id = i.model_id 
      AND b.brand_id = m.brand_id 
      AND td.technical_description_id = i.technical_description_id 
      AND td.fuel_id = f.fuel_id 
      AND d.door_id = td.door_id 
      AND vc.vehicle_condition_id = td.vehicle_condition_id 
      AND ct.cartype_id = td.cartype_id 
      AND fe.feature_id = td.feature_id 
      AND tr.transmission_id = td.transmission_id 
      AND c.clima_id = td.clima_id 
      AND t.tuev_id = td.tuev_id;
    `;
    if (!formularIsNumber(inserateId)) {
        selectMysqlErrorMessages("error id", res);
    }
    else {
        let connection;
        try {
            connection = await connectToDatabase();
            const queryResult = await connection.execute(query, [inserateId]);
            const result = queryResult[0];
            console.log(result[0]);
            if (result[0] !== undefined) {
                const { inserate_id, brand, model, price, cartype, mileage_km, registration_year, registration_month, transmission, inserate_date, power_ps, vehicle_owners, cubic_capacity, au_new, hu_new, door, accident, fuel, is_car_dealer, clima, description_car, scheckheft, fit_to_drive, abstandstempomat, ambientbeleuchtung, headupdisplay, totwinkelassistent, color, city, federal_state, zipcode, companyname, impressum, forename, surename, tel_nr, street_nr, since, name, familyname } = result[0];
                const axiosData = {
                    inseratId: inserate_id, model, brand, price, mileageKm: mileage_km, registrtionYear: registration_year, registrationMonth: registration_month, powerPS: power_ps, vehicleOwners: vehicle_owners,
                    cartype, accident, fuel, transmission, inserateDate: inserate_date, cubicCapacity: cubic_capacity, auNew: au_new,
                    huNew: hu_new, doors: door, isCardealer: is_car_dealer, clima, description: description_car, scheckheft, fittodrive: fit_to_drive, abstandstempomat, ambientbeleuchtung,
                    headupdisplay, totwinkelassistent, color, city, federalState: federal_state, zipcode, companyName: companyname, impressum, foreName: forename, sureName: surename,
                    telNr: tel_nr, streetNr: is_car_dealer ? street_nr : null, since, contactPerson: is_car_dealer ? name : null, contactPersonSurname: is_car_dealer ? familyname : null
                };
                if (req.user) {
                    if (req.user.role !== Roles.ADMIN) {
                        connection.execute(updateClick, [inserateId]);
                    }
                }
                connection.end();
                return res.status(200).json(axiosData);
            }
            else {
                return res.status(200).json(undefined);
            }
        }
        catch (error) {
            console.log("Error:", error);
            connection?.end();
            selectMysqlErrorMessages(error.code, res);
        }
    }
};
