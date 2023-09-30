"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signrequest = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
function signrequest(url, body = undefined) {
    let destinationurl = url;
    let timestamp = unixTimestamp();
    let requesttobehashedandsigned = "";
    if (!body) {
        requesttobehashedandsigned = timestamp + destinationurl;
    }
    else {
        let requestbody = JSON.stringify(body);
        requesttobehashedandsigned = timestamp + destinationurl + requestbody;
    }
    console.log('Request to be signed: ' + requesttobehashedandsigned);
    //hashing and signing the request
    let hashedrequest = hashsha256AndSign(requesttobehashedandsigned);
    return { destinationurl, timestamp, hashedrequest };
}
exports.signrequest = signrequest;
function unixTimestamp() {
    return Math.floor(Date.now() / 1000);
}
function hashsha256AndSign(unhashedstring) {
    let data = Buffer.from(unhashedstring);
    const privateKey = fs_1.default.readFileSync('./private.pem');
    console.log('secret: ' + privateKey);
    const sha256Hasher = crypto_1.default.sign('SHA256', data, privateKey).toString("base64url");
    return sha256Hasher;
}
