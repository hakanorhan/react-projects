import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import checkAuth from "./jwt/checkAuth.js";
import writeBrand from "./routes/dashboard/postBrand.js";
import writeModel from "./routes/dashboard/postModel.js";
import fetchBrand from "./routes/dashboard/fetchBrand.js";
import fetchModel from "./routes/dashboard/fetchModel.js";
import { URLs } from './enums/URLs.js';
import authenticate from "./jwt/authenticate.js";
import fetchBaureihe from "./routes/dashboard/fetchBaureihe.js";
import fetchBaureiheModel from "./routes/dashboard/fetchBaureiheModel.js";
import writeBaureihe from "./routes/dashboard/postBaureihe.js";
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
const app = express();
app.use(cors({
    credentials: true,
    origin: URLs.ORIGIN_CLIENT,
    methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(cookieParser());
app.post(URLs.POST_SIGINUP, signupUser);
app.post(URLs.POST_SIGNIN, signin);
app.post(URLs.POST_INSERATE_CAR, authenticate, inserateCar);
app.get(URLs.GET_CHECK_AUTH, checkAuth);
app.get(URLs.FETCH_INSERATE_PUBLISH, authenticate, fetchInserateForPublish);
app.post(URLs.POST_WRITE_BRAND, authenticate, writeBrand);
app.get(URLs.FETCH_BRAND, fetchBrand);
app.get(URLs.FETCH_MODEL, fetchModel);
app.get(URLs.FETCH_BAUREIHE, fetchBaureihe);
app.post(URLs.FETCH_BAUREIHE_MODEL, fetchBaureiheModel);
app.post(URLs.POST_INSERT_BAUREIHE, authenticate, writeBaureihe);
app.get(URLs.FETCH_DYNAMIC_SEARCH, dynamicSearch);
app.post(URLs.POST_INSERT_MODEL, authenticate, writeModel);
app.post(URLs.POST_PUBLISH, authenticate, postPublish);
app.get(URLs.FETCH_STATIC_DATA, fetchStaticData);
app.get(URLs.FETCH_DETAIL_SEARCH + "/:id", fetchDetailSearch);
app.get(URLs.FETCH_BUNDESLAENDER, fetchBuendeslaender);
app.get(URLs.FETCH_IMAGENAMES + "/:id", fetchImageNames);
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
        const carId = req.body.carId;
        const firstPlace = req.body.isFirstPlace === 'true';
        const imageName = file.fieldname + '' + Date.now() + path.extname(file.originalname);
        const imageNameInDatabase = insertImageName(imageName, carId, firstPlace);
        cb(null, imageName);
    }
});
const upload = multer({ storage: storage });
app.post('/upload', authenticate, upload.array('images', 5), (req, res) => {
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
