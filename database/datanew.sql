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
    brand VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (brandid)
);

CREATE TABLE cartypes(
    cartypeid INT NOT NULL AUTO_INCREMENT,
    cartype VARCHAR(55) NOT NULL UNIQUE,
    PRIMARY KEY(cartypeid)
);

CREATE TABLE fuels(
    fuelid INT NOT NULL AUTO_INCREMENT,
    fuelname VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (fuelid)
);

CREATE TABLE models(
    modelid INT NOT NULL AUTO_INCREMENT,
    model VARCHAR(255) NOT NULL UNIQUE,
    brandid INT NOT NULL,
    PRIMARY KEY(modelid),
    FOREIGN KEY (brandid) REFERENCES brands(brandid)
    );

CREATE TABLE baureihen(
    baureiheid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    baureihe VARCHAR(50) NOT NULL UNIQUE,
    cartypeid INT NOT NULL,
    von DATE NOT NULL,
    bis DATE NOT NULL,
    kw INT NOT NULL,
    hubraum INT NOT NULL,
    modelid INT NOT NULL,
    FOREIGN KEY (modelid) REFERENCES models(modelid),
    FOREIGN KEY (cartypeid) REFERENCES cartypes(cartypeid)
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
    price INT NOT NULL,
    km INT NOT NULL,
    year DATE NOT NULL,
    transmissionid INT NOT NULL,
    motorizationid INT NOT NULL,
    advertiseinfoid INT NOT NULL,
    selectedexteriorid INT,
    selectedinteriorid INT,
    FOREIGN KEY(advertiseinfoid) REFERENCES advertiseinfo(advertiseinfoid),
    FOREIGN KEY (motorizationid) REFERENCES motorization(motorizationid),
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
INSERT INTO bundesland(kuerzel, bundesland) values("NW", "Nordrhein-Westfalen");
INSERT INTO bundesland(kuerzel, bundesland) values("RP", "Rheinland-Pfalz");
INSERT INTO bundesland(kuerzel, bundesland) values("SL", "Saarland");
INSERT INTO bundesland(kuerzel, bundesland) values("SN", "Sachsen");
INSERT INTO bundesland(kuerzel, bundesland) values("ST", "Sachsen-Anhalt");
INSERT INTO bundesland(kuerzel, bundesland) values("SH", "Schleswig-Holstein");
INSERT INTO bundesland(kuerzel, bundesland) values("TH", "Thüringen");

INSERT INTO cartypes(cartype) VALUES ("Limousine");
INSERT INTO cartypes(cartype) VALUES ("Kombi");
INSERT INTO cartypes(cartype) VALUES ("Coupe");
INSERT INTO cartypes(cartype) VALUES ("Cabrio");
INSERT INTO cartypes(cartype) VALUES ("Kleinwagen");
INSERT INTO cartypes(cartype) VALUES ("SUV");


INSERT INTO fuels (fuelname) VALUES ("Benzin");
INSERT INTO fuels (fuelname) VALUES ("Diesel");
INSERT INTO fuels (fuelname) VALUES ("Hybrid");
INSERT INTO fuels (fuelname) VALUES ("Elektro");

-- static data
INSERT INTO brands (brandname) VALUES ("Alfa Romeo");
INSERT INTO brands (brandname) VALUES ("Alpina");
INSERT INTO brands (brandname) VALUES ("Aston Martin");
INSERT INTO brands (brandname) VALUES ("Audi");
INSERT INTO brands (brandname) VALUES ("Bentley");
INSERT INTO brands (brandname) VALUES ("BMW");
INSERT INTO brands (brandname) VALUES ("Cadillac");
INSERT INTO brands (brandname) VALUES ("Chevrolet");
INSERT INTO brands (brandname) VALUES ("Chrysler");
INSERT INTO brands (brandname) VALUES ("Citroen");
INSERT INTO brands (brandname) VALUES ("Cupra");
INSERT INTO brands (brandname) VALUES ("Dacia");
INSERT INTO brands (brandname) VALUES ("Daihatsu");
INSERT INTO brands (brandname) VALUES ("Dodge");
INSERT INTO brands (brandname) VALUES ("DS Automobiles");
INSERT INTO brands (brandname) VALUES ("Ferrari");
INSERT INTO brands (brandname) VALUES ("Fiat");
INSERT INTO brands (brandname) VALUES ("Ford");
INSERT INTO brands (brandname) VALUES ("Honda");
INSERT INTO brands (brandname) VALUES ("Hummer");
INSERT INTO brands (brandname) VALUES ("Hynundai");
INSERT INTO brands (brandname) VALUES ("Infiniti");
INSERT INTO brands (brandname) VALUES ("Isuzu");
INSERT INTO brands (brandname) VALUES ("Jaguar");
INSERT INTO brands (brandname) VALUES ("Jeep");
INSERT INTO brands (brandname) VALUES ("Kia");
INSERT INTO brands (brandname) VALUES ("Alfa Romeo");
INSERT INTO brands (brandname) VALUES ("Lexus");
INSERT INTO brands (brandname) VALUES ("Maserati");
INSERT INTO brands (brandname) VALUES ("Maybach");
INSERT INTO brands (brandname) VALUES ("Mazda");
INSERT INTO brands (brandname) VALUES ("McLaren");
INSERT INTO brands (brandname) VALUES ("Mercdes-Benz");
INSERT INTO brands (brandname) VALUES ("Mini");
INSERT INTO brands (brandname) VALUES ("Mitsubishi");
INSERT INTO brands (brandname) VALUES ("Nissan");
INSERT INTO brands (brandname) VALUES ("Opel");
INSERT INTO brands (brandname) VALUES ("Peugeot");
INSERT INTO brands (brandname) VALUES ("Porsche");
INSERT INTO brands (brandname) VALUES ("Renault");
INSERT INTO brands (brandname) VALUES ("Rolls-Royce");
INSERT INTO brands (brandname) VALUES ("Saab");
INSERT INTO brands (brandname) VALUES ("Saleen");
INSERT INTO brands (brandname) VALUES ("Seat");
INSERT INTO brands (brandname) VALUES ("Skoda");
INSERT INTO brands (brandname) VALUES ("Smart");
INSERT INTO brands (brandname) VALUES ("Subaru");
INSERT INTO brands (brandname) VALUES ("Suzuki");
INSERT INTO brands (brandname) VALUES ("Tesla");
INSERT INTO brands (brandname) VALUES ("Toyota");
INSERT INTO brands (brandname) VALUES ("Volvo");
INSERT INTO brands (brandname) VALUES ("Volkswagen");

-- Model Audi
INSERT INTO models(model, brandid, typeid) VALUES ("100", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("80", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A1", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A1", 4, 5);
INSERT INTO models(model, brandid, typeid) VALUES ("A2", 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A3", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A3", 4, 5);
INSERT INTO models(model, brandid, typeid) VALUES ("A4", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A4", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("A4", 4, 4);
INSERT INTO models(model, brandid, typeid) VALUES ("A4 Allraod", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("A5", 4, 4);
INSERT INTO models(model, brandid, typeid) VALUES ("A5", 4, 3);
INSERT INTO models(model, brandid, typeid) VALUES ("A5", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A6", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A6", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("A6 Allroad", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("A7", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("A8", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("e-tron", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("e-tron gt", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("Q1", 4, 6);
INSERT INTO models(model, brandid, typeid) VALUES ("Q2", 4, 6);
INSERT INTO models(model, brandid, typeid) VALUES ("Q3", 4, 6);
INSERT INTO models(model, brandid, typeid) VALUES ("Q7", 4, 6);
INSERT INTO models(model, brandid, typeid) VALUES ("Q8", 4, 6);
INSERT INTO models(model, brandid, typeid) VALUES ("R8", 4, 4);
INSERT INTO models(model, brandid, typeid) VALUES ("R8", 4, 3);
INSERT INTO models(model, brandid, typeid) VALUES ("RS3", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("RS4", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("RS4", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("RS5", 4, 3);
INSERT INTO models(model, brandid, typeid) VALUES ("RS5", 4, 4);
INSERT INTO models(model, brandid, typeid) VALUES ("RS6", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("RS6", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("S3", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("S4", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("S4", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("S5", 4, 3);
INSERT INTO models(model, brandid, typeid) VALUES ("S5", 4, 4);
INSERT INTO models(model, brandid, typeid) VALUES ("S6", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("S6", 4, 2);
INSERT INTO models(model, brandid, typeid) VALUES ("S8", 4, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("TT", 4, 3);
INSERT INTO models(model, brandid, typeid) VALUES ("TT", 4, 4);
INSERT INTO models(model, brandid, typeid) VALUES ("TTRS", 4, 3);
INSERT INTO models(model, brandid, typeid) VALUES ("TTRS", 4, 4);
INSERT INTO models(model, brandid, typeid) VALUES ("TTS", 4, 3);
INSERT INTO models(model, brandid, typeid) VALUES ("TTS", 4, 4);

-- Skoda
INSERT INTO models(model, brandid, typeid) VALUES ("Fabia", 45, 1);
INSERT INTO models(model, brandid, typeid) VALUES ("Kodiaq", 45, 6);

-- Motorization Wikipedia
-- Audi A3 Benzin https://de.wikipedia.org/wiki/Audi_A3_8L
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("30 TFSI", 110, 999, 1, 5, 2020);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("35 TFSI", 150, 1498, 1, 5, 2020);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("40 TFSI", 190, 1984, 1, 5, 2020);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("S3 TFSI", 310, 1984, 1, 33, 2020);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("RS3 TFSI", 400, 2480, 1, 27, 2020);
-- Audi A3 Diesel https://de.wikipedia.org/wiki/Audi_A3_8L
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("30 TDI", 116, 1968, 2, 5, 2020);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("35 TDI", 150, 1968, 2, 5, 2020);
INSERT INTO motorization(motorization, ps, hubraum, fuelid, modelid, yearFrom) VALUES ("40 TDI", 200, 1968, 2, 5, 2020);

INSERT INTO transmissions(transmissionname) VALUES ("Automatik");
INSERT INTO transmissions(transmissionname) VALUES ("Schaltgetriebe");

INSERT INTO exteriors(exteriorname) VALUES("Einparkhilfe");
INSERT INTO exteriors(exteriorname) VALUES("Tempomat");

-- User erstellt ein neuen Account
INSERT INTO address(streetnr, zipcode, city, blandid) values("Musterstr. 95", "49889", "Essen", 10);
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid)
VALUES ("Hakan", "Orhan", "hakan@mail.de", "Hakan.89!", "015478xx", "2000-09-24", 1);
Insert INTO user(userid) VALUES(1);

-- Fahrzeug inserieren 
INSERT INTO advertiseinfo(userid) VALUES (1);
INSERT INTO cars(price, km, year, transmissionid, motorizationid, advertiseinfoid) VALUES (45000, 0, "2024-02-25", 1, 8,1);

INSERT INTO advertiseinfo(userid) VALUES (1);
INSERT INTO cars(price, km, year, transmissionid, motorizationid, advertiseinfoid) VALUES (32500, 2500, "2022-02-25", 1, 1, 1);


/*
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

INSERT INTO address(streetnr, zipcode, city, blandid) values("Musterstr. 95", "49889", "Nürnberg", "BY");
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid)
VALUES ("Userin", "Tachfrau", "tach@test.de", "1234HBa", "015478xx", "1999-09-24", 5);
Insert INTO user(userid) VALUES(5);

-- Admin1 setzt isactive 0 admin2
update person SET isactive= 0 where personid = 2;
update whocreatedeletedemployee SET deletedfrom = 1 where personid = 2;

-- User4 inseriert ein neues Fahrzeug
INSERT INTO advertiseinfo(userid) VALUES(4);
*/
