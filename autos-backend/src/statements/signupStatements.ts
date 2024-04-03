import { Roles } from "../enums/Roles.js";


export const insertPerson: string =
    `INSERT INTO ${Roles.PERSON} (name, familyname, email, password, telnr, birth, addressid, role) VALUES (?, ?, ?, ?, ?,?, ?, ?);`;

export const insertDealerInfo: string =
    `INSERT INTO dealerinformations(dealerid, companyname, impressumdaten) VALUES(?, ?, ?)`;

export const insertAdress: string =
    `INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)`;

export const insertUser: string = 
    `INSERT INTO ${Roles.USER} (userid, iscardealer, ischat, istelefon, isemail) VALUES(?, ?, ?, ?, ?)`;

export const insertAdmin: string = 
    `INSERT INTO ${Roles.ADMIN} (adminid) VALUES(?)`;

export const insertWhoCreatedDeletedEmployee: string =
    `INSERT INTO whocreatedeletedemployee (personid, createdfrom) VALUES (?, ?)`;

/* -------- SELECT -------------- */
export const selectTokenInstanceCheck: string = 
    'SELECT COUNT(personid) as count FROM person WHERE personid = ? AND name = ? AND role = ?';