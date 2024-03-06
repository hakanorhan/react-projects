import { Roles } from "../enums/Roles.js";
export const insertPerson = `INSERT INTO ${Roles.PERSON} (name, familyname, email, password, role) VALUES (?, ?, ?, ?, ?);`;
export const insertPersonFull = `INSERT INTO ${Roles.PERSON} (name, familyname, email, password, telnr, birth, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;
export const insertAdress = `INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)`;
export const insertUser = `INSERT INTO ${Roles.USER} (userid, iscardealer) VALUES(?, ?)`;
export const insertAdmin = `INSERT INTO ${Roles.ADMIN} (adminid) VALUES(?)`;
export const insertWhoCreatedDeletedEmployee = `INSERT INTO whocreatedeletedemployee (personid, createdfrom) VALUES (?, ?)`;
export const selectTokenInstanceCheck = 'SELECT COUNT(personid) as count FROM person WHERE personid = ? AND name = ? AND email = ? AND role = ?';
