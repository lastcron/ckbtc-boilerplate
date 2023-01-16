"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtconfirmation_1 = __importDefault(require("../services/jwtconfirmation"));
const protectedController_1 = __importDefault(require("../controllers/protectedController"));
const routesProtected = express_1.default.Router();
const controller = new protectedController_1.default();
// Route for Global Dashboard - Protected by the JWT Middleware
routesProtected.get("/", jwtconfirmation_1.default, (req, res) => {
    console.log("Entering protected route ");
    controller.maindashboard(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// Route for Module 1 Dashboard - Protected by the JWT Middleware
routesProtected.get("/module1", jwtconfirmation_1.default, (req, res) => {
    console.log("Entering protected route - Module 1 ");
    controller.module1(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// Route for Module 2 Dashboard - Protected by the JWT Middleware
routesProtected.get("/module2", jwtconfirmation_1.default, (req, res) => {
    console.log("Entering protected route - Module 2 ");
    controller.module2(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
exports.default = routesProtected;
