import { Roles } from "../enums/Roles.js";

export const insertPerson: string =
    `INSERT INTO ${Roles.PERSON} (name, familyname, email, password, role) VALUES (?, ?, ?, ?, ?);`;

export const insertPersonFull: string =
    `INSERT INTO ${Roles.PERSON} (name, familyname, email, password, telnr, birth, addressid, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

export const insertAdress: string =
    `INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)`;

export const insertUser: string = 
    `INSERT INTO ${Roles.USER} (userid, iscardealer) VALUES(?, ?)`;

export const insertAdmin: string = 
    `INSERT INTO ${Roles.ADMIN} (adminid) VALUES(?)`;

export const insertWhoCreatedDeletedEmployee: string =
    `INSERT INTO whocreatedeletedemployee (personid, createdfrom) VALUES (?, ?)`;