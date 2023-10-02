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
const debug_1 = __importDefault(require("debug"));
// defintion of a logging descriptor
const publicendpointLog = (0, debug_1.default)('ckBTC-PaymentConnector:publicEndpoints');
class publicController {
    constructor() {
        this.login = (req) => {
            return new Promise((resolve, reject) => {
                try {
                    // Log the raw body and entering message
                    publicendpointLog('Raw Body:', req.rawBody);
                    publicendpointLog('Got body:', req.body);
                    publicendpointLog("Entering login ");
                    // Enable this authentication method if you are using dynamic users
                    if (false) {
                        // Extract user and password from the request body
                        const user = req.body.username;
                        const password = req.body.password;
                        // Check if user and password are provided
                        if (!user || !password) {
                            resolve({
                                result: "Invalid User or Password",
                                token: '',
                                refreshToken: ''
                            });
                            return;
                        }
                        const myusername = "usertest";
                        const mypassword = "password";
                        if (req.body.username == myusername && req.body.password == mypassword) {
                            publicendpointLog("User and Password are valid ");
                            // Generate tokens and handle session
                            const token = (0, loginservice_1.generateAccessToken)({ username: req.body.username });
                            const refreshToken = (0, loginservice_1.generateRefreshToken)({ username: req.body.username });
                            publicendpointLog("Token: " + token);
                            publicendpointLog("Req Session: " + req.session);
                            if (req.session) {
                                const session = req.session;
                                session.user = req.body.username;
                                publicendpointLog("Session: " + session.user);
                            }
                            resolve({
                                result: "Valid User",
                                token: token,
                                refreshToken: refreshToken
                            });
                        }
                        else {
                            publicendpointLog("User and Password invalid ");
                            resolve({
                                result: "User not authorized",
                                token: '',
                                refreshToken: ''
                            });
                        }
                    }
                    else {
                        // Check if static API KEY is valid
                        const static_apikey = process.env.APIKEY;
                        publicendpointLog("Header ApiKey : " + req.headers.apikey);
                        publicendpointLog("Static ApiKey : " + static_apikey);
                        if (static_apikey == req.headers.apikey) {
                            // Generate tokens for authorized user
                            const token = (0, loginservice_1.generateAccessToken)({ username: req.body.username });
                            const refreshToken = (0, loginservice_1.generateRefreshToken)({ username: req.body.username });
                            publicendpointLog("Token: " + token);
                            resolve({
                                result: "User Authorized",
                                token: token,
                                refreshToken: refreshToken
                            });
                        }
                        else {
                            // Handle invalid API Key
                            resolve({
                                result: "Invalid ApiKey",
                                token: '',
                                refreshToken: ''
                            });
                        }
                    }
                }
                catch (error) {
                    // Handle unexpected errors
                    reject({ error: "Login unexpected error", message: error });
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
