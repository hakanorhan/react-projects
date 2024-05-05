import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import writeBrand from "./routes/dashboard/postBrand.js";
import writeModel from "./routes/dashboard/postModel.js";
import fetchBrand from "./routes/dashboard/fetchBrand.js";
import fetchModel from "./routes/dashboard/fetchModel.js";
import { URLs } from './enums/URLs.js';
import multer from "multer";
import path from "path";
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
import passport, { authMiddelware } from "./routes/middleware/passport.middleware.js";
import authenticationUser from "./routes/authenticationUser.js";
import { addConnectListener, addDisconnectListener } from "./routes/middleware/session.middleware.js";
import sessionMiddleware from "./routes/middleware/session.middleware.js";
const app = express();
app.use((req, res, next) => {
    addConnectListener();
    addDisconnectListener();
    next();
});
app.use(sessionMiddleware);
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
app.use(passport.initialize());
app.use(passport.session());
app.post(URLs.POST_SIGINUP, signupUser);
app.post(URLs.POST_SIGINUP_EMAILCHECK, emailCheck);
app.post(URLs.POST_SIGNIN, passport.authenticate('local'), signin);
app.post(URLs.POST_INSERATE_CAR, authMiddelware, inserateCar);
app.get(URLs.POST_INSERATE_CAR, authMiddelware, inserateCar);
app.get(URLs.FETCH_INSERATE_PUBLISH, authMiddelware, fetchInserateForPublish);
app.post(URLs.POST_INSERT_BRAND, authMiddelware, writeBrand);
app.get(URLs.FETCH_BRAND, fetchBrand);
app.post(URLs.FETCH_MODEL, fetchModel);
app.get(URLs.FETCH_COUNT, dynamicSearchCount);
app.post(URLs.POST_INSERT_MODEL, authMiddelware, writeModel);
app.post(URLs.POST_PUBLISH, authMiddelware, postPublish);
app.get(URLs.FETCH_STATIC_CAR_DATA, fetchStaticData);
app.get(URLs.FETCH_DETAIL_SEARCH + "/:id", fetchDetailSearch);
app.get(URLs.FETCH_BUNDESLAENDER, fetchBuendeslaender);
app.get(URLs.FETCH_IMAGENAMES + "/:id", fetchImageNames);
app.get(URLs.FETCH_LIST_CARS, fetchListCars);
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
        const imageName = file.fieldname + '' + Date.now() + path.extname(file.originalname);
        const imageNameInDatabase = insertImageName(imageName, insertId);
        cb(null, imageName);
    }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.array('images', 5), (req, res) => {
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
