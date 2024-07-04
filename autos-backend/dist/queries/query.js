import { connectToDatabase } from "../dbConnect.js";
const insertImageName = async (imageName, carId) => {
    const insertInto = "INSERT INTO imagename(imagename, inserate_id) VALUES(?, ?)";
    let connection;
    try {
        connection = await connectToDatabase();
        await connection.execute(insertInto, [imageName, carId]);
        connection.end();
        return true;
    }
    catch (err) {
        connection?.end();
        return false;
    }
};
const deleteImages = async (inserateId, imageName) => {
    const deleteQuery = "DELETE FROM imagename WHERE inserate_id = ? AND imagename = ?";
    let connection;
    try {
        connection = await connectToDatabase();
        await connection.execute(deleteQuery, [inserateId, imageName]);
        connection.end();
    }
    catch (error) {
        console.log(error);
        connection?.end();
    }
};
