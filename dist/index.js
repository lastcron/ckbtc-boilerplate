"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
// debug library
const debug = require("debug");
// defintion of a logging descriptor
const server = debug('ckBTC-PaymentConnector:server');
//Redis & Redis Store
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//rate limiter
const expressLimiter = require('express-limiter');
//loads the environment files
dotenv_1.default.config();
//creates an instance of the express server
const app = (0, express_1.default)();
//setup the redis session store and rate limiter - CHANGE IT TO TRUE TO MAKE IT WORK
//You can run a Redis container with the following command: docker run --name my-redis -p 6379:6379 -d redis
if (false) {
    server("Redis Session Storage Enabled ");
    server("Redis Rate Limiter Enabled ");
    //Connecting to REDIS
    const redisClient = new ioredis_1.default({ port: 6379, host: 'localhost', enableOfflineQueue: false });
    redisClient.connect(() => {
        server("Redis connection succesful ");
    });
    redisClient.on('error', (err) => {
        server("Redis connection error " + err);
    });
    //connecting redisStore
    const redisStore = (0, connect_redis_1.default)(express_session_1.default);
    //Enables cookie parser
    app.use((0, cookie_parser_1.default)());
    //defines the cookie expiration time
    const oneDay = 1000 * 60 * 60 * 24;
    //defines rate limiter
    const limiter = expressLimiter(app, redisClient);
    // If the API is not behind a trusted proxy like nginx use lookup: ['connection.remoteAddress']
    // or ['headers.x-forwarded-for'] in case it is
    limiter({
        path: '*',
        method: 'all',
        lookup: ['connection.remoteAddress'],
        total: 100,
        expire: 1000 * 60 // per minute
    });
    //Secret should come from .env file
    app.use((0, express_session_1.default)({
        secret: 'restapijrhktjlkjfhleasjdfhalskdfjhasjlkdfhadslfkjhsadfddksjhalsdkfjhasdljfalsd',
        store: new redisStore({ client: redisClient }),
        cookie: { maxAge: oneDay },
        saveUninitialized: true,
        resave: false
    }));
}
// setup the morgan logger
app.use((0, morgan_1.default)('dev'));
// Treblle API Monitoring enabling , check https://treblle.com. You need to create an account and generate your 
// apikey and project id. Make sure you create an .env file in the root of your project to add these constants.
//useTreblle(app, {
//  apiKey: process.env.TREBLLE_APIKEY,
//  projectId: process.env.TREBLLE_PROJECTID,
//  });
//instantiating the use of CORS globally for all endpoint responses
app.use((0, cors_1.default)());
//instantiating the use of GZIP compression globally for all resposnses
app.use((0, compression_1.default)());
// Define your custom verify function
const customVerify = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString('utf8');
    }
};
//defining bodyparser json and rawbody
app.use(body_parser_1.default.json({ verify: customVerify }));
//defining bodyparser json
app.use(body_parser_1.default.urlencoded({ extended: true }));
//Setting a folder to serve static content (like documentation)
app.use('/static', express_1.default.static("static-files"));
// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);
exports.default = app;
