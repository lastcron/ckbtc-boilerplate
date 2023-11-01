import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import { useTreblle } from 'treblle';
import morgan from 'morgan';

// debug library
import debug = require('debug');
// defintion of a logging descriptor
const server = debug('ckBTC-PaymentConnector:server');

//Redis & Redis Store
import Redis from 'ioredis';
import session from 'express-session';
import connectredis from 'connect-redis';
import cookieParser from 'cookie-parser';

//rate limiter
const expressLimiter = require ('express-limiter') ;

 
//loads the environment files
dotenv.config();

//creates an instance of the express server
const app = express();

//setup the redis session store and rate limiter - CHANGE IT TO TRUE TO MAKE IT WORK
//You can run a Redis container with the following command: docker run --name my-redis -p 6379:6379 -d redis
if (false){
  server("Redis Session Storage Enabled ")
  server("Redis Rate Limiter Enabled ")
  
  //Connecting to REDIS
  const redisClient = new Redis({ port: 6379, host: 'localhost', enableOfflineQueue: false });
  redisClient.connect(()=>{
    server("Redis connection succesful ");
  })
  redisClient.on('error', (err) => {
    server("Redis connection error " + err);
  });
  
  //connecting redisStore
  const redisStore = connectredis(session); 

  //Enables cookie parser
  app.use(cookieParser());

  //defines the cookie expiration time
  const oneDay = 1000 * 60 * 60 * 24;

  //defines rate limiter
  const limiter = expressLimiter(app,redisClient);
  
  // If the API is not behind a trusted proxy like nginx use lookup: ['connection.remoteAddress']
  // or ['headers.x-forwarded-for'] in case it is
  limiter({
    path: '*', // All endpoint
    method: 'all', // All Methods
    lookup: ['connection.remoteAddress'], //Limiter criteria
    total: 100, // 100 requests 
    expire: 1000 * 60 // per minute
  })

  //Secret should come from .env file
   app.use(session({
    secret: 'restapijrhktjlkjfhleasjdfhalskdfjhasjlkdfhadslfkjhsadfddksjhalsdkfjhasdljfalsd',
    store: new redisStore({client: redisClient}),
    cookie: { maxAge: oneDay },
    saveUninitialized: true,
    resave: false
  }));
}
 
// setup the morgan logger
app.use(morgan('dev'));

// Treblle API Monitoring enabling , check https://treblle.com. You need to create an account and generate your 
// apikey and project id. Make sure you create an .env file in the root of your project to add these constants.
//useTreblle(app, {
//  apiKey: process.env.TREBLLE_APIKEY,
//  projectId: process.env.TREBLLE_PROJECTID,
//  });

//instantiating the use of CORS globally for all endpoint responses
app.use(cors());

//instantiating the use of GZIP compression globally for all resposnses
app.use (compression());

// Define your custom verify function
const customVerify = (req:any, res:any, buf:any, encoding:any) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString('utf8');
  }
};

//defining bodyparser json and rawbody
app.use(bodyParser.json({ verify: customVerify }));

//defining bodyparser json
app.use(bodyParser.urlencoded({ extended: true }));

//Setting a folder to serve static content (like documentation)
app.use('/static', express.static("static-files"));

// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);




export default app;