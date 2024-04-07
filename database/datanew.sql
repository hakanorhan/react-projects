CREATE DATABASE cars;
USE cars;

CREATE TABLE bundesland(
	blandid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	kuerzel VARCHAR(10) NOT NULL UNIQUE,
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
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telnr VARCHAR(50),
    birth DATE,
    isactive TINYINT(1) NOT NULL DEFAULT 1,
    createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    addressid INT NOT NULL,
    role enum ('user', 'admin') NOT NULL,
    PRIMARY KEY (personid),
    FOREIGN KEY (addressid) REFERENCES address (addressid)
);

CREATE TABLE admin(
	adminid INT PRIMARY KEY,
    FOREIGN KEY(adminid) REFERENCES person(personid)
);

CREATE TABLE user(
	userid INT NOT NULL,
    iscardealer TINYINT(1) NOT NULL DEFAULT 0,
    ischat TINYINT(1) NOT NULL DEFAULT 0,
    istelefon TINYINT(1) NOT NULL DEFAULT 0,
    isemail TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY(userid) REFERENCES person(personid)
);

CREATE TABLE dealerinformations (
    dealerid INT NOT NULL,
    companyname VARCHAR(255) NOT NULL,
    impressumdaten VARCHAR(255) NOT NULL,
    FOREIGN KEY (dealerid) REFERENCES user(userid)
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

CREATE TABLE doors(
    doorid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    doors VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE models(
    modelid INT NOT NULL AUTO_INCREMENT,
    model VARCHAR(255) NOT NULL,
    brandid INT NOT NULL,
    PRIMARY KEY(modelid),
    FOREIGN KEY (brandid) REFERENCES brands(brandid),
    UNIQUE (model, brandid)
    );

CREATE TABLE transmissions(
    transmissionid INT AUTO_INCREMENT NOT NULL,
    transmissionname VARCHAR(55) NOT NULL UNIQUE,
    PRIMARY KEY (transmissionid)
);

CREATE TABLE prices(
    priceid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    price INT NOT NULL UNIQUE
);

CREATE TABLE advertiseinfo(
	advertiseinfoid INT AUTO_INCREMENT PRIMARY KEY,
    advertiseddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    advertiseupdateddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    userid INT NOT NULL,
    -- user can deactivate the advertise after selling the car
    -- admin can deactivate the advertise 
    isactive TINYINT(1) NOT NULL DEFAULT 1,
     -- advertised car belongs to user
    FOREIGN KEY (userid) REFERENCES user (userid)
);

CREATE TABLE klima (
    klimaid INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    klimaname VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE cars(
    carid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    modelid INT NOT NULL,
    price INT NOT NULL,
    km INT NOT NULL,
    cartypeid INT NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    transmissionid INT NOT NULL,
    advertiseinfoid INT NOT NULL,
    fuelid INT NOT NULL,
    ps INT NOT NULL,
    klimaid INT NOT NULL,
    previousowner INT NOT NULL,
    hubraum INT NOT NULL,
    doorid INT NOT NULL,
    aunew TINYINT NOT NULL DEFAULT 0,
    hunew TINYINT NOT NULL DEFAULT 0,
    scheckheft TINYINT NOT NULL DEFAULT 0,
    accident TINYINT NOT NULL DEFAULT 0,
    fittodrive TINYINT NOT NULL DEFAULT 0,
    color VARCHAR(35) NULL,
    abstandstempomat TINYINT NOT NULL DEFAULT 0,
    ambientbeleuchtung TINYINT NOT NULL DEFAULT 0,
    headupdisplay TINYINT NOT NULL DEFAULT 0,
    totwinkelassistent TINYINT NOT NULL DEFAULT 0,
    description VARCHAR(255) NULL,
    FOREIGN KEY (modelid) REFERENCES models(modelid),
    FOREIGN KEY(advertiseinfoid) REFERENCES advertiseinfo(advertiseinfoid),
    FOREIGN KEY (transmissionid) REFERENCES transmissions (transmissionid),
    FOREIGN KEY (cartypeid) REFERENCES cartypes(cartypeid),
    FOREIGN KEY (fuelid) REFERENCES fuels(fuelid),
    FOREIGN KEY (doorid) REFERENCES doors(doorid),
    FOREIGN KEY (klimaid) REFERENCES klima(klimaid)
);

CREATE TABLE images(
    imageid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    imagename VARCHAR(255) NOT NULL,
    firstplace TINYINT DEFAULT 0 NOT NULL,
    carid INT NOT NULL,
    FOREIGN KEY (carid) REFERENCES cars(carid)
);

-- cargrants created if admin grant for public
CREATE TABLE cargrants(
	grantid INT AUTO_INCREMENT PRIMARY KEY,
    -- admin can public the advertise
	grantedpublic TINYINT(1) NOT NULL DEFAULT 0,
    granteddate TIMESTAMP NULL,
    grantedbyid INT NULL,
    carid INT NOT NULL,
    FOREIGN KEY (grantedbyid) REFERENCES admin(adminid),
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
INSERT INTO fuels (fuelname) VALUES ("Erdgas CNG");
INSERT INTO fuels (fuelname) VALUES ("Wasserstoff");
INSERT INTO fuels (fuelname) VALUES ("Ethanol");
INSERT INTO fuels (fuelname) VALUES ("Plug-in-Hybrid");



INSERT INTO transmissions(transmissionname) VALUES ("Automatik");
INSERT INTO transmissions(transmissionname) VALUES ("Schaltgetriebe");

INSERT INTO doors(doors) VALUES(2);
INSERT INTO doors(doors) VALUES(4);
INSERT INTO doors(doors) VALUES(6);

INSERT INTO klima(klimaname) VALUES("Keine");
INSERT INTO klima(klimaname) VALUES("Klimaanlage");
INSERT INTO klima(klimaname) VALUES("Klimaautomatik");


-- static data
INSERT INTO brands (brand) VALUES ("Alfa Romeo");
INSERT INTO brands (brand) VALUES ("Alpina");
INSERT INTO brands (brand) VALUES ("Aston Martin");
INSERT INTO brands (brand) VALUES ("Audi");
INSERT INTO brands (brand) VALUES ("Bentley");
INSERT INTO brands (brand) VALUES ("BMW");
INSERT INTO brands (brand) VALUES ("Cadillac");
INSERT INTO brands (brand) VALUES ("Chevrolet");
INSERT INTO brands (brand) VALUES ("Chrysler");
INSERT INTO brands (brand) VALUES ("Citroen");
INSERT INTO brands (brand) VALUES ("Cupra");
INSERT INTO brands (brand) VALUES ("Dacia");
INSERT INTO brands (brand) VALUES ("Daihatsu");
INSERT INTO brands (brand) VALUES ("Dodge");
INSERT INTO brands (brand) VALUES ("DS Automobiles");
INSERT INTO brands (brand) VALUES ("Ferrari");
INSERT INTO brands (brand) VALUES ("Fiat");
INSERT INTO brands (brand) VALUES ("Ford");
INSERT INTO brands (brand) VALUES ("Honda");
INSERT INTO brands (brand) VALUES ("Hummer");
INSERT INTO brands (brand) VALUES ("Hynundai");
INSERT INTO brands (brand) VALUES ("Infiniti");
INSERT INTO brands (brand) VALUES ("Isuzu");
INSERT INTO brands (brand) VALUES ("Jaguar");
INSERT INTO brands (brand) VALUES ("Jeep");
INSERT INTO brands (brand) VALUES ("Kia");
INSERT INTO brands (brand) VALUES ("Alfa Romeo");
INSERT INTO brands (brand) VALUES ("Lexus");
INSERT INTO brands (brand) VALUES ("Maserati");
INSERT INTO brands (brand) VALUES ("Maybach");
INSERT INTO brands (brand) VALUES ("Mazda");
INSERT INTO brands (brand) VALUES ("McLaren");
INSERT INTO brands (brand) VALUES ("Mercdes-Benz");
INSERT INTO brands (brand) VALUES ("Mini");
INSERT INTO brands (brand) VALUES ("Mitsubishi");
INSERT INTO brands (brand) VALUES ("Nissan");
INSERT INTO brands (brand) VALUES ("Opel");
INSERT INTO brands (brand) VALUES ("Peugeot");
INSERT INTO brands (brand) VALUES ("Porsche");
INSERT INTO brands (brand) VALUES ("Renault");
INSERT INTO brands (brand) VALUES ("Rolls-Royce");
INSERT INTO brands (brand) VALUES ("Saab");
INSERT INTO brands (brand) VALUES ("Saleen");
INSERT INTO brands (brand) VALUES ("Seat");
INSERT INTO brands (brand) VALUES ("Skoda");
INSERT INTO brands (brand) VALUES ("Smart");
INSERT INTO brands (brand) VALUES ("Subaru");
INSERT INTO brands (brand) VALUES ("Suzuki");
INSERT INTO brands (brand) VALUES ("Tesla");
INSERT INTO brands (brand) VALUES ("Toyota");
INSERT INTO brands (brand) VALUES ("Volvo");
INSERT INTO brands (brand) VALUES ("Volkswagen");

INSERT INTO transmissions(transmissionname) VALUES ("Automatik");
INSERT INTO transmissions(transmissionname) VALUES ("Schaltgetriebe");

INSERT INTO exteriors(exteriorname) VALUES("Einparkhilfe");
INSERT INTO exteriors(exteriorname) VALUES("Tempomat");

INSERT INTO prices(price) VALUES(0);
INSERT INTO prices(price) VALUES(500);
INSERT INTO prices(price) VALUES(1000);
INSERT INTO prices(price) VALUES(2000);
INSERT INTO prices(price) VALUES(5000);
INSERT INTO prices(price) VALUES(7500);
INSERT INTO prices(price) VALUES(10000);
INSERT INTO prices(price) VALUES(15000);
INSERT INTO prices(price) VALUES(20000);
INSERT INTO prices(price) VALUES(30000);
INSERT INTO prices(price) VALUES(40000);
INSERT INTO prices(price) VALUES(50000);
INSERT INTO prices(price) VALUES(60000);
INSERT INTO prices(price) VALUES(70000);
INSERT INTO prices(price) VALUES(80000);



-- User erstellt ein neuen Account
INSERT INTO address(streetnr, zipcode, city, blandid) values("Musterstr. 95", "49889", "Essen", 10);
INSERT INTO person (name, familyname, email, password, telnr, birth, addressid)
VALUES ("Hakan", "Orhan", "hakan@mail.de", "Hakan.89!", "015478xx", "2000-09-24", 1);
Insert INTO user(userid) VALUES(1);

-- Fahrzeug inserieren 
INSERT INTO advertiseinfo(userid) VALUES (1);
INSERT INTO cars(price, km, year, transmissionid, motorizationid, advertiseinfoid) VALUES (45000, 0, "2024-02-25", 1, 8,1);

INSERT INTO advertiseinfo(userid) VALUES (1);
INSERT INTO cars(modelid, price, km, cartypeid, year, month) VALUES (32500, 2500, "2022-02-25", 1, 1, 1);

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
