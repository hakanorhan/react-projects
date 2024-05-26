import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import writeBrand from "./routes/dashboard/insertBrand.js";
import writeModel from "./routes/dashboard/insertModel.js";
import fetchBrand from "./routes/dashboard/fetchBrand.js";
import fetchModel from "./routes/dashboard/fetchModel.js";
import { URLs } from './enums/URLs.js';
import multer from "multer";
import path, { dirname } from "path";
import fetchStaticData from "./routes/fetchStaticData.js";
import dynamicSearchCount from "./routes/fetchDynamicSearchCount.js";
import fs from 'fs';
import { insertImageName } from "./queries/query.js";
import fetchInserateForPublish from "./routes/dashboard/fetchInserateForPublish.js";
import fetchDetailSearch from "./routes/fetchDetailSearch.js";
import fetchImageNames from "./routes/fetchImageNames.js";
import fetchBuendeslaender from "./routes/fetchBuendeslaender.js";
import postPublish from "./routes/dashboard/postPublish.js";
import emailCheck from "./routes/emailCheck.js";
import logout from "./routes/logout.js";
import { fetchListCars } from "./routes/fetchListCars.js";
import { fileURLToPath } from 'url';
import passport, { authMiddelware } from "./routes/middleware/passport.middleware.js";
import authenticationUser from "./routes/authenticationUser.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const session = __require("express-session");
import fetchImageName from "./routes/fetchImageName.js";
import inserateFinish from "./routes/inserateFinish.js";
import sharp from "sharp";
import { fetchClickedCars } from "./routes/fetchClickedCars.js";
const MySQLStore = require('express-mysql-session')(session);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'cars'
};
const sessionStore = new MySQLStore(options);
app.use(session({
    secret: 'Session_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
sessionStore.onReady().then(() => {
    console.log('MySQLStore ready');
}).catch((error) => {
    console.error(error);
});
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    credentials: true,
    origin: URLs.ORIGIN_CLIENT,
    methods: ['GET', 'POST', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.post(URLs.POST_SIGINUP, signupUser);
app.post(URLs.POST_SIGINUP_EMAILCHECK, emailCheck);
app.post(URLs.POST_SIGNIN, passport.authenticate('local'), signin);
app.post(URLs.POST_INSERATE_CAR, authMiddelware, inserateCar);
app.get(URLs.POST_INSERATE_CAR, authMiddelware, inserateCar);
app.post(URLs.POST_INSERATE_FINISH, authMiddelware, inserateFinish);
app.get(URLs.FETCH_INSERATE_PUBLISH, authMiddelware, fetchInserateForPublish);
app.post(URLs.POST_INSERT_BRAND, authMiddelware, writeBrand);
app.get(URLs.FETCH_BRAND, fetchBrand);
app.post(URLs.FETCH_MODEL, fetchModel);
app.get(URLs.FETCH_COUNT, dynamicSearchCount);
app.post(URLs.POST_INSERT_MODEL, authMiddelware, writeModel);
app.post(URLs.POST_PUBLISH, authMiddelware, postPublish);
app.get(URLs.SEARCH_DATAS, fetchStaticData);
app.get(URLs.FETCH_DETAIL_SEARCH + "/:id", fetchDetailSearch);
app.get(URLs.FETCH_BUNDESLAENDER, fetchBuendeslaender);
app.get(URLs.FETCH_IMAGENAMES + "/:id", fetchImageNames);
app.get(URLs.FETCH_IMAGENAME + "/:id", fetchImageName);
app.get(URLs.FETCH_LIST_CARS, fetchListCars);
app.post(URLs.FETCH_CLICKED_CARS, fetchClickedCars);
app.delete(URLs.LOGOUT, logout);
app.get(URLs.AUTHENTICATION_USER, authenticationUser);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const carId = req.body.carId;
        const newUploadPath = `./uploads/${carId}`;
        fs.mkdir(newUploadPath, { recursive: true }, function (err) {
            if (err) {
                console.log("Error", err);
            }
            else {
                cb(null, newUploadPath);
            }
        });
    },
    filename: function (req, file, cb) {
        const insertId = req.body.carId;
        const imageName = file.originalname;
        cb(null, imageName);
    }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.array('images', 20), (req, res) => {
    const files = req.files;
    const insertId = req.body.carId;
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    async function processSharp() {
        try {
            const processedFiles = await Promise.all(files.map(async (file) => {
                const imageName = 'resized_' + file.filename;
                const outputFilePath = path.join(file.destination, imageName);
                await sharp(file.path)
                    .resize(768, 432, { fit: 'cover' })
                    .toFile(outputFilePath);
                console.log("ImageName: " + file.filename);
                const imageNameInDatabase = insertImageName(imageName, insertId);
                fs.unlinkSync(file.path);
                return outputFilePath;
            }));
            res.status(200).json({
                message: 'Files uploaded and resized successfully.',
                files: processedFiles
            });
        }
        catch (error) {
            console.error('Error processing images:', error);
            res.status(500).send('Error processing images.');
        }
    }
    ;
    processSharp();
});
app.get('/uploads/:id/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const id = req.params.id;
    res.sendFile(imageName, { root: `./uploads/${id}` });
});
app.delete(URLs.DELETE_IMAGE + "/:inserateid/:imagename", authMiddelware, (req, res) => {
    const inserateId = req.params.inserateid;
    const imageName = 'resized_' + req.params.imagename;
    console.log(inserateId + " " + imageName);
    const filePath = path.join(__dirname, `../uploads/${inserateId}`, imageName);
    fs.unlink(filePath, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Fehler beim Löschen.' });
        }
        res.status(200).json({ message: 'Bild erfolgreich gelöscht' });
    });
});
app.listen(3001, () => {
    console.log("Server started!");
});
