CREATE DATABASE cars;
USE cars;

CREATE TABLE bundesland(
	blandid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	kuerzel VARCHAR(10) NOT NULL,
    bundesland VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE address(
    addressid INT AUTO_INCREMENT NOT NULL,
    streetnr VARCHAR(255) NOT NULL,
    zipcode VARCHAR(5) NOT NULL,
    city VARCHAR(100) NOT NULL,
    blandid INT NOT NULL,
    updateddate TIMESTAMP,
    PRIMARY KEY (addressid),
    FOREIGN KEY (blandid) REFERENCES bundesland (blandid)
);

CREATE TABLE person(
    personid INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    familyname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    telnr VARCHAR(50),
    birth DATE,
    isactive TINYINT(1) NOT NULL DEFAULT 1,
    createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    addressid INT,
    role enum ('user', 'service', 'admin') NOT NULL,
    PRIMARY KEY (personid),
    FOREIGN KEY (addressid) REFERENCES address (addressid)
);

CREATE TABLE admin(
	adminid INT PRIMARY KEY,
    FOREIGN KEY(adminid) REFERENCES person(personid)
);

CREATE TABLE service(
	serviceid INT PRIMARY KEY,
    cansetpublic TINYINT(1) DEFAULT 0,
    FOREIGN KEY(serviceid) REFERENCES person(personid)
);

CREATE TABLE user(
	userid INT PRIMARY KEY,
    iscardealer TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY(userid) REFERENCES person(personid)
);

-- Self referencing
CREATE TABLE whocreatedeletedemployee(
	createid INT NOT NULL AUTO_INCREMENT,
	personid INT NOT NULL,
    createdfrom INT NOT NULL,
    -- can delete 
    deletedfrom INT,
    PRIMARY KEY(createid),
    FOREIGN KEY (personid) REFERENCES person(personid),
	FOREIGN KEY (createdfrom) REFERENCES admin(adminid),
    FOREIGN KEY (deletedfrom) REFERENCES admin(adminid)
);

-- static properties
CREATE TABLE brands(
    brandid INT NOT NULL AUTO_INCREMENT,
    brandname VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (brandid)
);

CREATE TABLE models(
    modelid INT NOT NULL AUTO_INCREMENT,
    model VARCHAR(255) NOT NULL,
    brandid INT NOT NULL,
    PRIMARY KEY(modelid),
    FOREIGN KEY (brandid) REFERENCES brands(brandid)
);

CREATE TABLE fuels(
    fuelid INT NOT NULL AUTO_INCREMENT,
    fuelname VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (fuelid)
);

CREATE TABLE motorization(
	motorizationid INT AUTO_INCREMENT NOT NULL,
    motorization VARCHAR(50) NOT NULL,
    ps INT NOT NULL,
    hubraum INT NOT NULL,
    fuelid INT NOT NULL,
    modelid INT NOT NULL,
    PRIMARY KEY(motorizationid),
    FOREIGN KEY(fuelid) REFERENCES fuels(fuelid),
	FOREIGN KEY(modelid) REFERENCES models(modelid)
);

CREATE TABLE cartypes(
    typeid INT NOT NULL AUTO_INCREMENT,
    typename VARCHAR(55) NOT NULL UNIQUE,
    PRIMARY KEY(typeid)
);

CREATE TABLE transmissions(
    transmissionid INT AUTO_INCREMENT NOT NULL,
    transmissionname VARCHAR(55) NOT NULL UNIQUE,
    PRIMARY KEY (transmissionid)
);

CREATE TABLE interiors(
    interiorid INT AUTO_INCREMENT NOT NULL,
    interiorname VARCHAR(255) NOT NULL,
    PRIMARY KEY (interiorid)
);

CREATE TABLE exteriors(
    exteriorid INT AUTO_INCREMENT NOT NULL,
    exteriorname VARCHAR(255) NOT NULL,
    PRIMARY KEY (exteriorid)
);

CREATE TABLE advertiseinfo(
	advertiseinfoid INT AUTO_INCREMENT PRIMARY KEY,
    advertiseddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    advertiseupdateddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    userid INT NOT NULL,
    -- user can deactivate the advertise after selling the car
    -- service department can deactivate the advertise 
    isactive TINYINT(1) NOT NULL DEFAULT 1,
     -- advertised car belongs to user
    FOREIGN KEY (userid) REFERENCES user (userid)
);

CREATE TABLE selectedinterior(
	selectedinteriorid INT AUTO_INCREMENT PRIMARY KEY,
    interiorid INT NOT NULL,
    FOREIGN KEY (interiorid) REFERENCES interiors(interiorid)
);

CREATE TABLE selectedexterior(
	selectedexteriorid INT AUTO_INCREMENT PRIMARY KEY,
    spiexeriorid INT NOT NULL,
    carid INT NOT NULL,
    exteriorid INT NOT NULL,
	FOREIGN KEY (exteriorid) REFERENCES exteriors(exteriorid)
);

CREATE TABLE cars(
    carid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    price INT NOT NULL UNIQUE,
    km INT NOT NULL UNIQUE,
    year DATE NOT NULL UNIQUE,
    brandid INT NOT NULL UNIQUE,
    modelid INT NOT NULL UNIQUE,
    typeid INT NOT NULL UNiQUE,
    transmissionid INT NOT NULL UNIQUE,
    motorizationid INT NOT NULL UNIQUE,
    advertiseinfoid INT NOT NULL UNIQUE,
    selectedexteriorid INT NOT NULL UNIQUE,
    selectedinteriorid INT NOT NULL UNIQUE,
    FOREIGN KEY(brandid) REFERENCES brands(brandid),
    FOREIGN KEY(modelid) REFERENCES models(modelid),
    FOREIGN KEY(advertiseinfoid) REFERENCES advertiseinfo(advertiseinfoid),
    FOREIGN KEY (motorizationid) REFERENCES motorization(motorizationid),
    FOREIGN KEY (typeid) REFERENCES cartypes (typeid),
    FOREIGN KEY (transmissionid) REFERENCES transmissions (transmissionid),
    FOREIGN KEY (selectedexteriorid ) REFERENCES selectedexterior(selectedexteriorid ), 
	FOREIGN KEY (selectedinteriorid) REFERENCES selectedinterior(selectedinteriorid)
);

-- cargrants created if service grant for public
CREATE TABLE cargrants(
	grantid INT AUTO_INCREMENT PRIMARY KEY,
    -- service department can public the advertise
	grantedpublic TINYINT(1) NOT NULL DEFAULT 0,
    granteddate TIMESTAMP,
    grantedbyid INT NOT NULL,
    carid INT NOT NULL,
    FOREIGN KEY (grantedbyid) REFERENCES service(serviceid),
    FOREIGN KEY (carid) REFERENCES cars(carid)
);


CREATE TABLE tuning(
	tuningid INT AUTO_INCREMENT NOT NULL,
    ps INT NOT NULL,
    hubraum INT NOT NULL,
    carid INT NOT NULL,
    PRIMARY KEY(tuningid),
    FOREIGN KEY(carid) REFERENCES cars(carid)
);

CREATE TABLE message(
	messageid INT AUTO_INCREMENT NOT NULL,
    senderid INT NOT NULL,
    receiverid INT NOT NULL,
    carid INT NOT NULL,
    message_text TEXT NOT NULL,
    PRIMARY KEY(messageid),
    FOREIGN KEY(senderid) REFERENCES user(userid),
    FOREIGN KEY(receiverid) REFERENCES user(userid),
    FOREIGN KEY(carid) REFERENCES cars(carid)
);

-- static data
INSERT INTO brands (brandname) VALUES ("Audi");
INSERT INTO brands (brandname) VALUES ("Mercedes");


INSERT INTO models(model, brandid) VALUES ("A4", 1);
INSERT INTO models(model, brandid) VALUES ("A5", 1);
INSERT INTO models(model, brandid) VALUES ("A", 2);
INSERT INTO models(model, brandid) VALUES ("E", 2);

INSERT INTO fuels (fuelname) VALUES ("Benzin");
INSERT INTO fuels (fuelname) VALUES ("Diesel");
INSERT INTO fuels (fuelname) VALUES ("Hybrid");
INSERT INTO fuels (fuelname) VALUES ("Elektro");

INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid)
VALUES("1.4 TFSI", 150, 1395, 1, 1);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid)
VALUES("3.0 TFSI", 354, 2995, 1, 1);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid)
VALUES("160", 109, 1332, 1, 3);

INSERT INTO cartypes(typename) VALUES ("Limousine");
INSERT INTO cartypes(typename) VALUES ("Kombi");
INSERT INTO cartypes(typename) VALUES ("Coupe");
INSERT INTO cartypes(typename) VALUES ("Cabrio");
INSERT INTO cartypes(typename) VALUES ("Kleinwagen");

INSERT INTO transmissions(transmissionname) VALUES ("Automatik");
INSERT INTO transmissions(transmissionname) VALUES ("Schaltgetriebe");


-- Bundesministerium für Bildung und Forschung
INSERT INTO bundesland(kuerzel, bundesland) values("BW", "Baden-Württemberg");
INSERT INTO bundesland(kuerzel, bundesland) values("BY", "Bayern");
INSERT INTO bundesland(kuerzel, bundesland) values("BE", "Berlin");
INSERT INTO bundesland(kuerzel, bundesland) values("BB", "Brandenburg");
INSERT INTO bundesland(kuerzel, bundesland) values("HB", "Bremen");
INSERT INTO bundesland(kuerzel, bundesland) values("HH", "Hamburg");
INSERT INTO bundesland(kuerzel, bundesland) values("HE", "Hessen");
INSERT INTO bundesland(kuerzel, bundesland) values("MV", "Mecklenburg-Vorpommern");
INSERT INTO bundesland(kuerzel, bundesland) values("NI", "Niedersachsen");
INSERT INTO bundesland(kuerzel, bundesland) values("NRW", "Nordrhein-Westfalen");
INSERT INTO bundesland(kuerzel, bundesland) values("RP", "Rheinland-Pfalz");
INSERT INTO bundesland(kuerzel, bundesland) values("SL", "Saarland");
INSERT INTO bundesland(kuerzel, bundesland) values("SN", "Sachsen");
INSERT INTO bundesland(kuerzel, bundesland) values("ST", "Sachsen-Anhalt");
INSERT INTO bundesland(kuerzel, bundesland) values("SH", "Schleswig-Holstein");
INSERT INTO bundesland(kuerzel, bundesland) values("TH", "Thüringen");

INSERT INTO exteriors(exteriorname) VALUES("Einparkhilfe");
INSERT INTO exteriors(exteriorname) VALUES("Tempomat");




-- ADMIN
INSERT INTO address(streetnr, zipcode, city, blandid) values("Musterstr. 45", "45889", "Gelsenkirchen", 10);
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid, role)
VALUES ("Hakan", "Orhan", "hakan@cars.de", "1234", "+4915000000000", "2000-10-04", 1, 'admin');
INSERT INTO admin(adminid) VALUES(1);
insert into whocreatedeletedemployee(personid, createdfrom) values(1, 1);


-- Admin erstellt ein neues Admin Account
INSERT INTO address(streetnr, zipcode, city, blandid) values("Abendtr. 459", "47889", "Dortmund", "NW");
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid)
VALUES ("Max", "Mustermann", "muster@test.de", "1234", "015478xx", "2007-12-04", 2);
INSERT INTO admin(adminid) VALUES(2);
insert into whocreatedeletedemployee(personid, createdfrom) values(2, 1);

-- Admin 2 erstellt ein neues Service Account
INSERT INTO address(streetnr, zipcode, city, blandid) values("Musterstr. 45", "49889", "Essen", "NW");
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid)
VALUES ("Sahra", "Musterfrau", "musterin@test.de", "1234", "015478xx", "2006-09-24", 3);
INSERT INTO service(serviceid) VALUES (3);
insert into whocreatedeletedemployee(personid, createdfrom) values(3, 2);

-- User erstellt ein neuen Account
INSERT INTO address(streetnr, zipcode, city, blandid) values("Musterstr. 95", "49889", "Essen", "NW");
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid)
VALUES ("User Hallo", "Hallomann", "hallo@test.de", "1234HBa", "015478xx", "2000-09-24", 4);
Insert INTO user(userid) VALUES(4);

INSERT INTO address(streetnr, zipcode, city, blandid) values("Musterstr. 95", "49889", "Nürnberg", "BY");
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid)
VALUES ("Userin", "Tachfrau", "tach@test.de", "1234HBa", "015478xx", "1999-09-24", 5);
Insert INTO user(userid) VALUES(5);

-- Admin1 setzt isactive 0 admin2
update person SET isactive= 0 where personid = 2;
update whocreatedeletedemployee SET deletedfrom = 1 where personid = 2;

-- User4 inseriert ein neues Fahrzeug
INSERT INTO advertiseinfo(userid) VALUES(4);

