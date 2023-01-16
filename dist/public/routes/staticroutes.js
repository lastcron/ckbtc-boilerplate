"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const staticRoutes = express_1.default.Router();
// Get config vars
dotenv_1.default.config();
//Root of Static Files
staticRoutes.get("/", function (req, res) {
});
exports.default = staticRoutes;
