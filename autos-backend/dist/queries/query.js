import { pool } from "../dbConnect.js";
export async function insertTransaction(insertQuery, values, res) {
    const resultFromTransaction = { insertId: null, success: false, message: '' };
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [resultBrand] = await connection.execute(insertQuery, values);
        const insertId = resultBrand.insertId;
        console.log(insertId + ": InsertId");
        await connection.commit();
        resultFromTransaction.success = true;
        resultFromTransaction.insertId = insertId;
        resultFromTransaction.message = "Erfolgreich hinzugefügt.";
        return res.status(200).json(resultFromTransaction);
    }
    catch (error) {
        let status = 0;
        if (error && error.code) {
            switch (error.code) {
                case 'ER_DUP_ENTRY':
                    resultFromTransaction.message = 'Eintrag bereits vorhanden';
                    status = 409;
                    break;
                case 'ER_NO_REFERENCED_ROW':
                    resultFromTransaction.message = 'Bad Request';
                    status = 400;
                    break;
                default:
                    resultFromTransaction.message = 'Fehler aufgetreten';
                    status = 500;
            }
        }
        connection.rollback();
        return res.status(status).json(resultFromTransaction);
    }
    finally {
        connection.release();
    }
}
export const insertImageName = async (imageName, carId, firstplace) => {
    const insertInto = "INSERT INTO imagename(imagename, firstplace, inserate_id) VALUES(?, ?, ?)";
    let connection = await pool.getConnection();
    try {
        await connection.execute(insertInto, [imageName, firstplace, carId]);
        connection.release();
        return true;
    }
    catch (err) {
        connection.release();
        console.log(err);
        return false;
    }
};
