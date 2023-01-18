"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginservice_1 = require("../services/loginservice");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
                    const token = (0, loginservice_1.generateAccessToken)({ username: req.body.username });
                    const Refreshtoken = (0, loginservice_1.generateRefreshToken)({ username: req.body.username });
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
                                token: token,
                                refreshToken: Refreshtoken
                            });
                        }
                        else {
                            publicendpointLog("User and Password invalid ");
                            resolve({
                                result: "Usuario Invalido",
                                token: token,
                                refreshToken: Refreshtoken
                            });
                        }
                    }
                    resolve({
                        result: "Acceso Concedido",
                        token: token,
                        refreshToken: Refreshtoken
                    });
                }
                catch (_a) {
                    reject({ error: "Login unexpected error" });
                }
            });
        };
        this.refresh = (req) => {
            return new Promise((resolve, reject) => {
                var _a;
                publicendpointLog("Entering refresh ");
                try {
                    if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) {
                        // Destructuring refreshToken from cookie
                        const refreshToken = req.cookies.jwt;
                        publicendpointLog("RefreshToken: " + refreshToken);
                        // Verifying refresh token
                        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
                            if (err) {
                                // Wrong Refesh Token
                                resolve({
                                    message: 'Unauthorized',
                                    ResponseCode: '406',
                                    Token: 'NA'
                                });
                            }
                            else {
                                // Correct token we send a new access token
                                const accessToken = jsonwebtoken_1.default.sign({
                                    username: req.body.username,
                                }, process.env.TOKEN_SECRET, {
                                    expiresIn: '10m'
                                });
                                resolve({
                                    message: 'Authorized',
                                    ResponseCode: '200',
                                    Token: accessToken
                                });
                            }
                        });
                    }
                    else {
                        publicendpointLog("No Cookies");
                        resolve({
                            message: 'Unauthorized',
                            ResponseCode: '406',
                            Token: 'NA'
                        });
                    }
                }
                catch (_b) {
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
