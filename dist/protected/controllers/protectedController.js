"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// debug library
const debug = require("debug");
// defintion of a logging descriptor
const protectedEndpointLog = debug('ckBTC-PaymentConnector:protectedEndpoints');
class publicController {
    constructor() {
        //Query AUTH Status
        this.authstatus = (req) => {
            return new Promise((resolve, reject) => {
                protectedEndpointLog('Got body:', req.body);
                protectedEndpointLog("Entering maindashboard: ");
                try {
                    //Make this true to enable session confirmation on this route
                    if (false) {
                        let session = req.session;
                        if (session.user) {
                            resolve({ message: "Authorization - PASSED, User: " + session.user });
                        }
                        else
                            resolve({ message: "Authorization - FAILED" });
                    }
                    resolve({ message: "Authorization - PASSED" });
                }
                catch (_a) {
                    reject({ error: "Auth unexpected error" });
                }
            });
        };
        //Query Balance for a user
        this.user_balance = (req) => {
            return new Promise((resolve, reject) => {
                protectedEndpointLog('Got body:', req.body);
                protectedEndpointLog("Entering Module 1: ");
                try {
                    resolve({ message: "protected Module 1" });
                }
                catch (_a) {
                    reject({ error: "Login unexpected error" });
                }
            });
        };
        //Query Payment information for a user from the database. Gets user address and creates a transaction with a pending state 
        this.payment_request = (req) => {
            return new Promise((resolve, reject) => {
                protectedEndpointLog('Got body:', req.body);
                protectedEndpointLog("Entering payment_request: ");
                try {
                    resolve({ message: "protected payment_request" });
                }
                catch (_a) {
                    reject({ error: "payment_request unexpected error" });
                }
            });
        };
        // Query the Status of a Transaction on the blockchain and saves it to database
        this.payment_status = (req) => {
            return new Promise((resolve, reject) => {
                protectedEndpointLog('Got body:', req.body);
                protectedEndpointLog("Entering payment_status: ");
                try {
                    resolve({ message: "protected payment_status" });
                }
                catch (_a) {
                    reject({ error: "payment_status unexpected error" });
                }
            });
        };
        //Query the Status of a Transaction on the database
        this.payment_received = (req) => {
            return new Promise((resolve, reject) => {
                protectedEndpointLog('Got body:', req.body);
                protectedEndpointLog("payment_received: ");
                try {
                    resolve({ message: "protected payment_received" });
                }
                catch (_a) {
                    reject({ error: "payment_received unexpected error" });
                }
            });
        };
    }
}
exports.default = publicController;
