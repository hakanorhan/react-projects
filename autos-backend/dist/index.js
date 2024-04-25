import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import { authenticate, authenticateNext } from './jwt/checkAuth.js';
import writeBrand from "./routes/dashboard/postBrand.js";
import writeModel from "./routes/dashboard/postModel.js";
import fetchBrand from "./routes/dashboard/fetchBrand.js";
import fetchModel from "./routes/dashboard/fetchModel.js";
import { URLs } from './enums/URLs.js';
import multer from "multer";
import path from "path";
import fetchStaticData from "./routes/fetchStaticData.js";
import dynamicSearch from "./routes/fetchDynamicSearch.js";
import fs from 'fs';
import { insertImageName } from "./queries/query.js";
import fetchInserateForPublish from "./routes/dashboard/fetchInserateForPublish.js";
import fetchDetailSearch from "./routes/fetchDetailSearch.js";
import fetchImageNames from "./routes/fetchImageNames.js";
import fetchBuendeslaender from "./routes/fetchBuendeslaender.js";
import postPublish from "./routes/dashboard/postPublish.js";
import emailCheck from "./routes/emailCheck.js";
import deleteToken from "./jwt/deleteToken.js";
import { fetchListCars } from "./routes/fetchListCars.js";
const app = express();
app.use(cors({
    credentials: true,
    origin: URLs.ORIGIN_CLIENT,
    methods: ['GET', 'POST', 'DELETE']
}));
app.use(express.json());
app.use(cookieParser());
app.get(URLs.GET_CHECK_AUTH, authenticate);
app.post(URLs.POST_SIGINUP, signupUser);
app.post(URLs.POST_SIGINUP_EMAILCHECK, emailCheck);
app.post(URLs.POST_SIGNIN, signin);
app.post(URLs.POST_INSERATE_CAR, authenticateNext, inserateCar);
app.get(URLs.POST_INSERATE_CAR, authenticateNext, inserateCar);
app.get(URLs.FETCH_INSERATE_PUBLISH, authenticateNext, fetchInserateForPublish);
app.post(URLs.POST_INSERT_BRAND, authenticateNext, writeBrand);
app.get(URLs.FETCH_BRAND, fetchBrand);
app.post(URLs.FETCH_MODEL, fetchModel);
app.get(URLs.FETCH_DYNAMIC_SEARCH, dynamicSearch);
app.post(URLs.POST_INSERT_MODEL, authenticateNext, writeModel);
app.post(URLs.POST_PUBLISH, authenticateNext, postPublish);
app.get(URLs.FETCH_STATIC_DATA, fetchStaticData);
app.get(URLs.FETCH_DETAIL_SEARCH + "/:id", fetchDetailSearch);
app.get(URLs.FETCH_BUNDESLAENDER, fetchBuendeslaender);
app.get(URLs.FETCH_IMAGENAMES + "/:id", fetchImageNames);
app.get(URLs.FETCH_LIST_CARS, fetchListCars);
app.delete(URLs.DELETE_TOKEN, authenticateNext, deleteToken);
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
        const firstPlace = req.body.isFirstPlace === 'true';
        const imageName = file.fieldname + '' + Date.now() + path.extname(file.originalname);
        const imageNameInDatabase = insertImageName(imageName, insertId, firstPlace);
        cb(null, imageName);
    }
});
const upload = multer({ storage: storage });
app.post('/upload', authenticateNext, upload.array('images', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    res.status(200).send('Files uploaded successfully.');
});
app.get('/uploads/:id/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const id = req.params.id;
    res.sendFile(imageName, { root: `./uploads/${id}` });
});
app.listen(3001, () => {
    console.log("Server started!");
});
