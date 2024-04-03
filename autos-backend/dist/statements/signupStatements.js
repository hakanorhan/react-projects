import { Roles } from "../enums/Roles.js";
export const insertPerson = `INSERT INTO ${Roles.PERSON} (name, familyname, email, password, telnr, birth, addressid, role) VALUES (?, ?, ?, ?, ?,?, ?, ?);`;
export const insertDealerInfo = `INSERT INTO dealerinformations(dealerid, companyname, impressumdaten) VALUES(?, ?, ?)`;
export const insertAdress = `INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)`;
export const insertUser = `INSERT INTO ${Roles.USER} (userid, iscardealer, ischat, istelefon, isemail) VALUES(?, ?, ?, ?, ?)`;
export const insertAdmin = `INSERT INTO ${Roles.ADMIN} (adminid) VALUES(?)`;
export const insertWhoCreatedDeletedEmployee = `INSERT INTO whocreatedeletedemployee (personid, createdfrom) VALUES (?, ?)`;
export const selectTokenInstanceCheck = 'SELECT COUNT(personid) as count FROM person WHERE personid = ? AND name = ? AND role = ?';
