import { pool } from "../../dbConnect.js";
const INSERT_INTO_CARGRANTS = "INSERT INTO cargrants (grantedpublic, carid) VALUES(?, ?)";
const insertIntoCarGrants = "UPDATE advertiseinfo AS a JOIN cars AS c ON c.advertiseinfoid = a.advertiseinfoid SET a.isactive = 1 WHERE c.carid = ?";
export default async (req, res) => {
    const axiosData = req.body;
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.execute(INSERT_INTO_CARGRANTS, [axiosData.canPublish, axiosData.carId]);
        await connection.execute(insertIntoCarGrants, [axiosData.carId]);
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt' });
    }
    catch {
        connection.rollback();
        return res.status(500).json({ message: 'Fehler' });
    }
    finally {
        connection.release();
    }
};
