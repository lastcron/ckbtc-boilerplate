"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../db/config"));
const sequelize = config_1.default;
const user_1 = __importDefault(require("../../db/models/user"));
// debug library
const debug = require("debug");
// defintion of a logging descriptor
const protectedEndpointLog = debug('ckBTC-PaymentConnector:protectedEndpoints');
class publicController {
    constructor() {
        //Query AUTH Status
        this.authstatus = (req) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    protectedEndpointLog('Got body:', req.body);
                    protectedEndpointLog("Entering authStatus");
                    //Make this true to enable session confirmation on this route
                    if (false) {
                        let session = req.session;
                        if (session.user) {
                            resolve({ message: "Authorization - PASSED, User: " + session.user });
                        }
                        else
                            resolve({ message: "Authorization - FAILED" });
                    }
                    const usercount = yield user_1.default.findAndCountAll();
                    let dbstatus = false;
                    if (usercount.count > 0) {
                        dbstatus = true;
                    }
                    else {
                        dbstatus = false;
                    }
                    resolve({ message: "Authorization - PASSED", dbstatus: dbstatus });
                }
                catch (_a) {
                    reject({ error: "Auth unexpected error" });
                }
            }));
        };
        //Query Balance for a user
        this.user_balance = (req) => {
            return new Promise((resolve, reject) => {
                try {
                    protectedEndpointLog("Entering Controller UserBalance");
                    protectedEndpointLog('Request Query Paramas: ', req.query);
                    protectedEndpointLog('Got body:', req.body);
                    protectedEndpointLog('----------------------');
                    if (req.query.user) {
                        protectedEndpointLog('User: ', req.query.user);
                        const user = req.query.user;
                        //Check address on the database
                        //Make a request to the blockchain to check balance
                        resolve({ message: "protected-UserBalance is X" });
                    }
                    else {
                        reject({ error: "User missing on request" });
                    }
                }
                catch (_a) {
                    reject({ error: "User Balance unexpected error" });
                }
            });
        };
        //Query Payment information for a user from the database. Gets user address and creates a transaction with a pending state 
        this.payment_request = (req) => {
            return new Promise((resolve, reject) => {
                try {
                    protectedEndpointLog("Entering Controller payment_request");
                    protectedEndpointLog('Request Query Paramas: ', req.query);
                    protectedEndpointLog('Got body:', req.body);
                    protectedEndpointLog('----------------------');
                    if (req.query.user && req.query.amount && req.query.terminal) {
                        protectedEndpointLog('User: ', req.query.user);
                        protectedEndpointLog('Amount : ', req.query.amount);
                        protectedEndpointLog('Terminal : ', req.query.terminal);
                        const user = req.query.user;
                        const amount = req.query.amount;
                        const terminal = req.query.terminal;
                        //save payment request with status pending on the database
                        //return object with qrcode and paymentid
                        resolve({ address: "protected payment_request", payment_id: "XXX" });
                    }
                    else {
                        reject({ error: "User , Amount or Terminal missing on request" });
                    }
                }
                catch (_a) {
                    reject({ error: "payment_request unexpected error" });
                }
            });
        };
        // Query the Status of a Transaction on the blockchain and saves it to database
        this.payment_status = (req) => {
            return new Promise((resolve, reject) => {
                try {
                    protectedEndpointLog("Entering payment_status");
                    protectedEndpointLog('Request Query Paramas: ', req.query);
                    protectedEndpointLog('Got body:', req.body);
                    protectedEndpointLog('----------------------');
                    if (req.query.user && req.query.payment_id) {
                        protectedEndpointLog('User: ', req.query.user);
                        protectedEndpointLog('Payment_id : ', req.query.payment_id);
                        const user = req.query.user;
                        const payment_id = req.query.payment_id;
                        //Check payment_id status on the database
                        //return object with payment satus
                        resolve({ status: "Not Payed", payment_id: "XXX" });
                    }
                    else {
                        reject({ error: "User or Payment ID missing on request" });
                    }
                }
                catch (_a) {
                    reject({ error: "payment_status unexpected error" });
                }
            });
        };
        //Query the Status of a Transaction on the database
        this.payment_received = (req) => {
            return new Promise((resolve, reject) => {
                try {
                    protectedEndpointLog("Entering payment_received");
                    protectedEndpointLog('Request Query Paramas: ', req.query);
                    protectedEndpointLog('Got body:', req.body);
                    protectedEndpointLog('----------------------');
                    if (req.body) {
                        protectedEndpointLog('Body: ', req.body);
                        const payment = req.body.payment;
                        //update payment  on the database
                        resolve({ Status: "Received" });
                    }
                    else {
                        reject({ error: "Body missing on request" });
                    }
                    resolve({ message: "protected payment_received" });
                }
                catch (_a) {
                    reject({ error: "payment_received unexpected error" });
                }
            });
        };
        //Query the Payment History for  a user
        this.payment_history = (req) => {
            return new Promise((resolve, reject) => {
                try {
                    protectedEndpointLog("Entering payment_history");
                    protectedEndpointLog('Request Query Paramas: ', req.query);
                    protectedEndpointLog('Got body:', req.body);
                    protectedEndpointLog('----------------------');
                    if (req.query.user) {
                        protectedEndpointLog('user: ', req.query.user);
                        const user = req.query.user;
                        //check history  on the database
                        // Return object with the history of payment
                        resolve({ history: "[]" });
                    }
                    else {
                        reject({ error: "User missing on request" });
                    }
                }
                catch (_a) {
                    reject({ error: "payment_history unexpected error" });
                }
            });
        };
    }
}
exports.default = publicController;
