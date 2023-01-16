"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const publicController_1 = __importDefault(require("../controllers/publicController"));
const routesPublic = express_1.default.Router();
const controller = new publicController_1.default();
// Get config vars
dotenv_1.default.config();
routesPublic.get("/", function (req, res) {
    res.json({
        message: "API ALIVE - CHECK DOCUMENTATION FOR PROPER USAGE"
    });
});
routesPublic.post("/login", (req, res) => {
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
