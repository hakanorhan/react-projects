import { Sequelize } from "sequelize";
import { sequelizeConfig } from "./sequelize.config.js";
const sequelize = new Sequelize(sequelizeConfig);
export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Verbindung erfolgreich hergestellt");
    }
    catch (error) {
        console.error('Fehler beim Herstellen');
    }
}
