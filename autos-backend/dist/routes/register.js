import { pool } from "../dbConnect.js";
/**
 * Insert user. telnr and birth aren't required.
 */
const insertUser = "INSERT INTO user (name, familyname, email, password, telnr, birth) VALUES (?, ?, ?, ?, ?, ?);";
/**
 * Insert adress. nr1 as housenumber with letter.
 */
const insertAddress = "INSERT INTO address (street, nr, nr1, zipcode, city, region, createddate, updateddate, userid) VALUES (?,?,?,?,?,?,?,?,?)";
/**
 * Insert userrole. begindate, enddate, createdbyuserid aren't required for normal user.
 */
const insertUserrole = "INSERT INTO userrole (begindate, enddate, createdbyuserid, userid, userrolenameid) VALUES (?,?,?,?,?)";
// disable autocommit and perform transaction
async function performTransaction(requestData) {
    const connection = await pool.getConnection();
    try {
        // start transaction
        await connection.beginTransaction();
        // if password1 password2 matches
        const [result] = await connection.execute(insertUser, [requestData.name, requestData.familyname,
            requestData.email, requestData.password1,
            requestData.telnr === "" ? null : requestData.telnr,
            requestData.birth === "" ? null : requestData.birth]);
        const userid = result.insertId;
        console.log("Last insert id: " + userid);
        /* insert address: userid as foreign key */
        await connection.execute(insertAddress, [requestData.street, requestData.nr, requestData.nr1, requestData.zipcode,
            requestData.city, requestData.region, requestData.createddate, null, userid]);
        // insert uerrole for normal user
        const userroleid = await connection.execute("SELECT userrolenameid from userrolename where userrolenamename='user'");
        console.log("Userroleid: " + userroleid);
        /*  */
        await connection.execute(insertUserrole, [null, null, null, userid, 2]);
        await connection.commit();
        console.log("Transaction successfully committed");
    }
    catch (err) {
        // rollback
        await connection.rollback();
        console.log("Rollback!!");
        throw err;
    }
    finally {
        // release connection
        connection.release();
    }
}
export default async (req, res) => {
    const requestData = req.body;
    performTransaction(requestData);
    console.log("--------------- Ausgabe: " + requestData.name + " " +
        requestData.familyname + " " + requestData.email);
};
//# sourceMappingURL=register.js.map