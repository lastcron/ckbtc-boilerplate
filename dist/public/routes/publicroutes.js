"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const publicController_1 = __importDefault(require("../controllers/publicController"));
const axios_1 = __importDefault(require("axios"));
// debug library
const debug = require("debug");
// defintion of a logging descriptor
const publicendpointLog = debug('HelloWorldAPI:publicEndpoints');
const routesPublic = express_1.default.Router();
const controller = new publicController_1.default();
// Get config vars
dotenv_1.default.config();
routesPublic.get("/", function (req, res) {
    let data;
    //AXIOS TEST REQUEST TO GET BITCOIN PRICE
    axios_1.default.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
        .then(response => {
        data = response.data.data;
        publicendpointLog("SYMBOL: " + data.currency + " , PRICE: " + data.rates.USD);
        res.json({
            message: "API ALIVE AND AXIOS REQUEST OK- CHECK DOCUMENTATION FOR PROPER USAGE",
            currency: data.currency,
            priceUSD: data.rates.USD
        });
    })
        .catch(error => {
        publicendpointLog("Error: " + error);
        res.json({
            message: "API ALIVE - Error Detected"
        });
    });
});
routesPublic.post("/login", (req, res) => {
    console.log("Entering Login Endpoint");
    controller.login(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// recover password. ( Needs to be a Post instead of a GET - It is intentionally a GET for Testing Purposes only)
routesPublic.get("/recover", (req, res) => {
    controller.recover(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// OTP password. ( Needs to be a Post instead of a GET - It is intentionally a GET for Testing Purposes only)
routesPublic.get("/register", (req, res) => {
    controller.register(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
exports.default = routesPublic;
