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
    controller.authstatus(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// Route for Query Balance for a user - Protected by the JWT Middleware
routesProtected.get("/user-balance", jwtconfirmation_1.default, (req, res) => {
    console.log("Entering protected route - user-balance ");
    controller.user_balance(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// Route for Querying Payment information for a user from the database. Gets user address and creates a transaction with a pending state - Protected by the JWT Middleware
routesProtected.get("/payment-request", jwtconfirmation_1.default, (req, res) => {
    console.log("Entering protected route - payment-request ");
    controller.payment_request(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// Route for Querying the Status of a Transaction on the blockchain and saves it to database - Protected by the JWT Middleware
routesProtected.get("/payment-status", jwtconfirmation_1.default, (req, res) => {
    console.log("Entering protected route - payment-status ");
    controller.payment_status(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
// Route for Querying the Status of a Transaction on the database- Protected by the JWT Middleware
routesProtected.get("/payment-received", jwtconfirmation_1.default, (req, res) => {
    console.log("Entering protected route - payment-received ");
    controller.payment_received(req)
        .then((data) => res.json({ data }))
        .catch((err) => res.json({ err }));
});
exports.default = routesProtected;
