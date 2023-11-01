
import express from 'express';
import dotenv from 'dotenv';
import publicController from '../controllers/publicController';
import axios from 'axios';

// debug library
import debug = require('debug');

// defintion of a logging descriptor
const publicendpointLog = debug('ckBTC-PaymentConnector:publicEndpoints');


const routesPublic = express.Router();
const controller = new publicController();

// Get config vars
dotenv.config();

routesPublic.get("/", function (req, res) {

  let data: any;
  //AXIOS TEST REQUEST TO GET BITCOIN PRICE
  axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
    .then(response => {

      data = response.data.data;
      publicendpointLog("SYMBOL: " + data.currency + " , PRICE: " + data.rates.USD);

      res.json({
        message: "API ALIVE AND AXIOS REQUEST OK- CHECK DOCUMENTATION FOR PROPER USAGE",
        currency: data.currency,
        priceUSD: data.rates.USD

      });

    })
    .catch(error => {
      publicendpointLog("Error: " + error);

      res.json({
        message: "API ALIVE - Error Detected"

      });
    });
});


//login a user and gets a JWT
routesPublic.post("/login", (req, res) => {
  console.log("Entering Login Endpoint");
  const loginPromiseResponse = {
    result: String,
    token: String,
    refreshToken: String
  }
  controller.login(req)
    .then(
      (loginPromiseResponse) => {

        const result = loginPromiseResponse.result;
        const token = loginPromiseResponse.token;
        const refreshToken = loginPromiseResponse.refreshToken;

        //Assigning refresh token in http-only cookie 365 Day
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'none', secure: true,
          maxAge: 365 * 24 * 60 * 60 * 1000
        });

        res.json(
          {
            result, token
          }
        );

      })

    .catch(
      (err) => res.json({ err })
    )

});

//refresh JWT
routesPublic.post("/refresh", (req, res) => {
  console.log("Entering Refresh Endpoint");
  const refreshPromiseResponse = {
    message: String,
    ResponseCode: String,
    Token: String
  }
  controller.refresh(req)
    .then(
      (refreshPromiseResponse: any) => {

        const message = refreshPromiseResponse.message;
        const token = refreshPromiseResponse.Token;
        const ResponseCode = refreshPromiseResponse.ResponseCode;

        res.status(ResponseCode);
        res.json(
          {
            message, token, ResponseCode
          }
        );

      })

    .catch(
      (err) => res.json({ err })
    )

});

// recover password. 
routesPublic.post("/recover", (req, res) => {

  controller.recover(req)
    .then(
      (data) => res.json({ data })
    )
    .catch(
      (err) => res.json({ err })
    )
});

// Register a user. 
routesPublic.post("/register", (req, res) => {

  controller.register(req)
    .then(
      (data) => res.json({ data })
    )
    .catch(
      (err) => res.json({ err })
    )

});

export default routesPublic;