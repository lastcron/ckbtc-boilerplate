"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const publicroutes_1 = __importDefault(require("./public/routes/publicroutes"));
const protectedroutes_1 = __importDefault(require("./protected/routes/protectedroutes"));
// debug library
const debug = require("debug");
// defintion of a logging descriptor
const server = debug('HelloWorldAPI:server');
// Defines the port where the API is going to be served. It looks up first if there is a env variable named PORT 
// available , otherwise defaults to port 3000. Change it accoring to your needs.
const port = process.env.PORT || '3000';
//Imports the files with routes definitions
index_1.default.use('/', publicroutes_1.default);
index_1.default.use('/app', protectedroutes_1.default);
//Starts the express server
index_1.default.listen(port, () => {
    server("Server listening on Port", port);
});
