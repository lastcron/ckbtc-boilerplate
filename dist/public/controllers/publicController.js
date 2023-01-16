"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginservice_1 = __importDefault(require("../services/loginservice"));
// debug library
const debug = require("debug");
// defintion of a logging descriptor
const publicendpointLog = debug('HelloWorldAPI:publicEndpoints');
class publicController {
    constructor() {
        this.login = (req) => {
            return new Promise((resolve, reject) => {
                publicendpointLog('Got body:', req.body);
                publicendpointLog("Entering login: " + req.body.username);
                try {
                    const token = (0, loginservice_1.default)({ username: req.body.username });
                    publicendpointLog("Token: " + token);
                    //Make the following true to enable session storage in ready. Requires to enable Redis on index.ts
                    if (true) {
                        // this variables are just for testing purposes - a database query goes here
                        let myusername = "usertest";
                        let mypassword = "password";
                        if (req.body.username == myusername && req.body.password == mypassword) {
                            publicendpointLog("User and Password are valid ");
                            let session = req.session;
                            session.user = req.body.username;
                            publicendpointLog("Session: " + session.user);
                            resolve({
                                result: "Usuario Valido",
                                token: token
                            });
                        }
                        else {
                            publicendpointLog("User and Password invalid ");
                            resolve({
                                result: "Usuario Invalido",
                                token: token
                            });
                        }
                    }
                    resolve({
                        result: "Acceso Concedido",
                        token: token
                    });
                }
                catch (_a) {
                    reject({ error: "Login unexpected error" });
                }
            });
        };
        this.recover = (req) => {
            return new Promise((resolve, reject) => {
                publicendpointLog('Got body:', req.body);
                publicendpointLog("Entering recover: ");
                resolve({ message: "Recover Password" });
            });
        };
        this.register = (req) => {
            return new Promise((resolve, reject) => {
                publicendpointLog('Got body:', req.body);
                publicendpointLog("Entering register: ");
                resolve({ message: "Registration" });
            });
        };
    }
}
exports.default = publicController;
