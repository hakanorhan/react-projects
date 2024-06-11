CREATE DATABASE cars;
USE cars;

CREATE TABLE federal_state(
	federal_state_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	short VARCHAR(10) NOT NULL UNIQUE,
    federal_state VARCHAR(22) NOT NULL UNIQUE
);

CREATE TABLE address(
    address_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    street_nr VARCHAR(255) NOT NULL,
    zipcode VARCHAR(5) NOT NULL,
    city VARCHAR(100) NOT NULL,
    federal_state_id INT NOT NULL,
    FOREIGN KEY (federal_state_id) REFERENCES federal_state (federal_state_id)
);

CREATE TABLE personal_data(
    personal_data_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    forename VARCHAR(30) NOT NULL,
    surename VARCHAR(30) NOT NULL,
    tel_nr VARCHAR(255) NULL,
    birthdate DATE NOT NULL,
    address_id INT NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE contact_preffered(
    contact_preffered_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contact_telefon TINYINT(1) NOT NULL DEFAULT 0,
    contact_email TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE account_data(
    account_data_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_secret VARCHAR(255) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    account_role enum('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE user(
    user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    personal_data_id INT NOT NULL,
    account_data_id INT NOT NULL,
    contact_preffered_id INT NOT NULL,
    is_car_dealer TINYINT(1) NOT NULL,
    rating INT NULL,
    FOREIGN KEY (personal_data_id) REFERENCES personal_data(personal_data_id),
    FOREIGN KEY (account_data_id) REFERENCES account_data(account_data_id),
    FOREIGN KEY (contact_preffered_id) REFERENCES contact_preffered(contact_preffered_id)
);

CREATE TABLE user_dealer(
    user_dealer_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    companyname VARCHAR(50) NOT NULL,
    impressum TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE brand(
    brand_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE model(
    model_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(255) NOT NULL,
    brand_id INT NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brand(brand_id),
    UNIQUE (model, brand_id)
    );

CREATE TABLE cartype(
    cartype_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cartype VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE fuel(
    fuel_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fuel VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE door(
    door_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    door VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE transmission(
    transmission_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    transmission VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE clima (
    clima_id INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    clima VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE price(
    price_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    price INT NOT NULL UNIQUE
);

CREATE TABLE feature(
    feature_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    abstandstempomat TINYINT(1) NOT NULL,
    ambientbeleuchtung TINYINT(1) NOT NULL,
    headupdisplay TINYINT(1) NOT NULL,
    totwinkelassistent TINYINT(1) NOT NULL
);

CREATE TABLE inserate_info(
	inserate_info_id INT AUTO_INCREMENT PRIMARY KEY,
    inserate_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE tuev(
    tuev_id INT AUTO_INCREMENT PRIMARY KEY,
    hu_new TINYINT(1) NOT NULL DEFAULT 0,
    au_new TINYINT(1) NOT NULL DEFAULT 0,
    scheckheft TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE vehicle_condition(
    vehicle_condition_id INT PRIMARY KEY AUTO_INCREMENT,
    accident TINYINT(1) NOT NULL DEFAULT 0,
    fit_to_drive TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE technical_description(
    technical_description_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    power_ps INT NOT NULL,
    mileage_km INT NOT NULL,
    cartype_id INT NOT NULL,
    registration_year INT NOT NULL,
    registration_month INT NOT NULL,
    transmission_id INT NOT NULL,
    description_car TEXT NULL,
    fuel_id INT NOT NULL,
    cubic_capacity INT NOT NULL,
    door_id INT NOT NULL,
    vehicle_owners INT NOT NULL,
    tuev_id INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    clima_id INT NOT NULL,
    feature_id INT NOT NULL,
    vehicle_condition_id INT NOT NULL,
    FOREIGN KEY(fuel_id) REFERENCES fuel(fuel_id),
    FOREIGN KEY(transmission_id) REFERENCES transmission(transmission_id),
    FOREIGN KEY(cartype_id) REFERENCES cartype(cartype_id),
    FOREIGN KEY(door_id) REFERENCES  door(door_id),
    FOREIGN KEY(tuev_id) REFERENCES tuev(tuev_id),
    FOREIGN KEY(vehicle_condition_id) REFERENCES vehicle_condition(vehicle_condition_id),
    FOREIGN KEY(clima_id) REFERENCES clima(clima_id),
    FOREIGN KEY(feature_id) REFERENCES feature(feature_id)
);

CREATE TABLE inserate(
    inserate_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    second_title VARCHAR(50) NULL,
    price INT NOT NULL,
    model_id INT NOT NULL,
    technical_description_id INT NOT NULL,
    inserate_info_id INT NOT NULL,
    clicks INT NOT NULL DEFAULT 0,
    entwurf INT NOT NULL DEFAULT 1,
    FOREIGN KEY(model_id) REFERENCES model(model_id),
    FOREIGN KEY(technical_description_id) REFERENCES technical_description(technical_description_id),
    FOREIGN KEY(inserate_info_id) REFERENCES inserate_info(inserate_info_id)
    );

CREATE TABLE imagename(
    image_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    imagename VARCHAR(255) NOT NULL,
    inserate_id INT NOT NULL,
    UNIQUE (imagename, inserate_id),
    FOREIGN KEY (inserate_id) REFERENCES inserate(inserate_id)
);

-- cargrants created if admin grant for public
CREATE TABLE inserate_check(
	inserate_check_id INT AUTO_INCREMENT PRIMARY KEY,
    
	inserate_public TINYINT(1) NOT NULL DEFAULT 0,
    inserate_cancelled TINYINT(1) NOT NULL DEFAULT 0,
    inserate_checked_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    inserate_cancelled_date TIMESTAMP NULL,
    inserate_id INT NOT NULL,
    FOREIGN KEY (inserate_id) REFERENCES inserate(inserate_id)
);

CREATE TABLE message(
	message_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    inserate_id INT NOT NULL,
    message_text TEXT NOT NULL,
    FOREIGN KEY(sender_id) REFERENCES user(user_id),
    FOREIGN KEY(receiver_id) REFERENCES user(user_id),
    FOREIGN KEY(inserate_id) REFERENCES inserate(inserate_id)
);





-- Bundesministerium für Bildung und Forschung
INSERT INTO federal_state(short, federal_state) values("BW", "Baden-Württemberg");
INSERT INTO federal_state(short, federal_state) values("BY", "Bayern");
INSERT INTO federal_state(short, federal_state) values("BE", "Berlin");
INSERT INTO federal_state(short, federal_state) values("BB", "Brandenburg");
INSERT INTO federal_state(short, federal_state) values("HB", "Bremen");
INSERT INTO federal_state(short, federal_state) values("HH", "Hamburg");
INSERT INTO federal_state(short, federal_state) values("HE", "Hessen");
INSERT INTO federal_state(short, federal_state) values("MV", "Mecklenburg-Vorpommern");
INSERT INTO federal_state(short, federal_state) values("NI", "Niedersachsen");
INSERT INTO federal_state(short, federal_state) values("NW", "Nordrhein-Westfalen");
INSERT INTO federal_state(short, federal_state) values("RP", "Rheinland-Pfalz");
INSERT INTO federal_state(short, federal_state) values("SL", "Saarland");
INSERT INTO federal_state(short, federal_state) values("SN", "Sachsen");
INSERT INTO federal_state(short, federal_state) values("ST", "Sachsen-Anhalt");
INSERT INTO federal_state(short, federal_state) values("SH", "Schleswig-Holstein");
INSERT INTO federal_state(short, federal_state) values("TH", "Thüringen");


INSERT INTO cartype(cartype) VALUES ("Limousine");
INSERT INTO cartype(cartype) VALUES ("Kombi");
INSERT INTO cartype(cartype) VALUES ("Coupe");
INSERT INTO cartype(cartype) VALUES ("Cabrio");
INSERT INTO cartype(cartype) VALUES ("Kleinwagen");
INSERT INTO cartype(cartype) VALUES ("SUV");


INSERT INTO fuel (fuel) VALUES ("Benzin");
INSERT INTO fuel (fuel) VALUES ("Diesel");
INSERT INTO fuel (fuel) VALUES ("Hybrid");
INSERT INTO fuel (fuel) VALUES ("Elektro");
INSERT INTO fuel (fuel) VALUES ("Erdgas CNG");
INSERT INTO fuel (fuel) VALUES ("Wasserstoff");
INSERT INTO fuel (fuel) VALUES ("Ethanol");
INSERT INTO fuel (fuel) VALUES ("Plug-in-Hybrid");

INSERT INTO transmission(transmission) VALUES ("Halbautomatik");
INSERT INTO transmission(transmission) VALUES ("Automatik");
INSERT INTO transmission(transmission) VALUES ("Schaltgetriebe");

INSERT INTO door(door) VALUES(2);
INSERT INTO door(door) VALUES(4);
INSERT INTO door(door) VALUES(6);

INSERT INTO clima(clima) VALUES("Keine");
INSERT INTO clima(clima) VALUES("Klimaanlage");
INSERT INTO clima(clima) VALUES("Klimaautomatik");


-- static data
INSERT INTO brand (brand) VALUES ("Alfa Romeo");
INSERT INTO brand (brand) VALUES ("Alpina");
INSERT INTO brand (brand) VALUES ("Aston Martin");
INSERT INTO brand (brand) VALUES ("Audi");
INSERT INTO brand (brand) VALUES ("Bentley");
INSERT INTO brand (brand) VALUES ("BMW");
INSERT INTO brand (brand) VALUES ("Cadillac");
INSERT INTO brand (brand) VALUES ("Chevrolet");
INSERT INTO brand (brand) VALUES ("Chrysler");
INSERT INTO brand (brand) VALUES ("Citroen");
INSERT INTO brand (brand) VALUES ("Cupra");
INSERT INTO brand (brand) VALUES ("Dacia");
INSERT INTO brand (brand) VALUES ("Daihatsu");
INSERT INTO brand (brand) VALUES ("Dodge");
INSERT INTO brand (brand) VALUES ("DS Automobiles");
INSERT INTO brand (brand) VALUES ("Ferrari");
INSERT INTO brand (brand) VALUES ("Fiat");
INSERT INTO brand (brand) VALUES ("Ford");
INSERT INTO brand (brand) VALUES ("Honda");
INSERT INTO brand (brand) VALUES ("Hummer");
INSERT INTO brand (brand) VALUES ("Hynundai");
INSERT INTO brand (brand) VALUES ("Infiniti");
INSERT INTO brand (brand) VALUES ("Isuzu");
INSERT INTO brand (brand) VALUES ("Jaguar");
INSERT INTO brand (brand) VALUES ("Jeep");
INSERT INTO brand (brand) VALUES ("Kia");
INSERT INTO brand (brand) VALUES ("Lexus");
INSERT INTO brand (brand) VALUES ("Maserati");
INSERT INTO brand (brand) VALUES ("Maybach");
INSERT INTO brand (brand) VALUES ("Mazda");
INSERT INTO brand (brand) VALUES ("McLaren");
INSERT INTO brand (brand) VALUES ("Mercdes-Benz");
INSERT INTO brand (brand) VALUES ("Mini");
INSERT INTO brand (brand) VALUES ("Mitsubishi");
INSERT INTO brand (brand) VALUES ("Nissan");
INSERT INTO brand (brand) VALUES ("Opel");
INSERT INTO brand (brand) VALUES ("Peugeot");
INSERT INTO brand (brand) VALUES ("Porsche");
INSERT INTO brand (brand) VALUES ("Renault");
INSERT INTO brand (brand) VALUES ("Rolls-Royce");
INSERT INTO brand (brand) VALUES ("Saab");
INSERT INTO brand (brand) VALUES ("Saleen");
INSERT INTO brand (brand) VALUES ("Seat");
INSERT INTO brand (brand) VALUES ("Skoda");
INSERT INTO brand (brand) VALUES ("Smart");
INSERT INTO brand (brand) VALUES ("Subaru");
INSERT INTO brand (brand) VALUES ("Suzuki");
INSERT INTO brand (brand) VALUES ("Tesla");
INSERT INTO brand (brand) VALUES ("Toyota");
INSERT INTO brand (brand) VALUES ("Volvo");
INSERT INTO brand (brand) VALUES ("Volkswagen");

INSERT INTO price(price) VALUES(500);
INSERT INTO price(price) VALUES(1000);
INSERT INTO price(price) VALUES(2000);
INSERT INTO price(price) VALUES(5000);
INSERT INTO price(price) VALUES(7500);
INSERT INTO price(price) VALUES(10000);
INSERT INTO price(price) VALUES(15000);
INSERT INTO price(price) VALUES(20000);
INSERT INTO price(price) VALUES(25000);
INSERT INTO price(price) VALUES(30000);
INSERT INTO price(price) VALUES(35000);
INSERT INTO price(price) VALUES(40000);
INSERT INTO price(price) VALUES(45000);
INSERT INTO price(price) VALUES(50000);
INSERT INTO price(price) VALUES(55000);
INSERT INTO price(price) VALUES(60000);
INSERT INTO price(price) VALUES(65000);
INSERT INTO price(price) VALUES(70000);
INSERT INTO price(price) VALUES(75000);
INSERT INTO price(price) VALUES(80000);
INSERT INTO price(price) VALUES(85000);
INSERT INTO price(price) VALUES(90000);
INSERT INTO price(price) VALUES(100000);
INSERT INTO price(price) VALUES(150000);
INSERT INTO price(price) VALUES(200000);
INSERT INTO price(price) VALUES(300000);

INSERT INTO model (model, brand_id) VALUES ("A4", 4);
INSERT INTO model (model, brand_id) VALUES ("A3", 4);
INSERT INTO model (model, brand_id) VALUES ("A1", 4);
INSERT INTO model (model, brand_id) VALUES ("A5", 4);
INSERT INTO model (model, brand_id) VALUES ("A7", 4);
INSERT INTO model (model, brand_id) VALUES ("S8", 4);
INSERT INTO model (model, brand_id) VALUES ("RSQ8", 4);
INSERT INTO model (model, brand_id) VALUES ("R8", 4);

INSERT INTO model (model, brand_id) VALUES ("116", 6);