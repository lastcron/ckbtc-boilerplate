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
const index_1 = __importDefault(require("./index"));
const publicroutes_1 = __importDefault(require("./public/routes/publicroutes"));
const protectedroutes_1 = __importDefault(require("./protected/routes/protectedroutes"));
const config_1 = __importDefault(require("./db/config"));
const user_1 = __importDefault(require("./db/models/user"));
// debug library
const debug = require("debug");
// defintion of a logging descriptor
const server = debug('ckBTC-PaymentConnector:server');
// Defines the port where the API is going to be served. It looks up first if there is a env variable named PORT 
// available , otherwise defaults to port 3000. Change it accoring to your needs.
const port = process.env.PORT || '3000';
//Imports the files with routes definitions
index_1.default.use('/', publicroutes_1.default);
index_1.default.use('/app', protectedroutes_1.default);
//Starts the express server
index_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    server("Server listening on Port: ", port);
    try {
        yield config_1.default.authenticate();
        console.log('Connection to databse has been established successfully.');
        //Checks if the User tables exits otherwise it creates it. If the NODE_ENV file is set to 'development' it will alsto apply any new 
        //changes of the model.
        const isDev = process.env.NODE_ENV === 'development';
        user_1.default.sync({ alter: isDev });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}));
