
import express from 'express';
import dotenv from 'dotenv';
import publicController from '../controllers/publicController';
import axios from 'axios';

// debug library
import debug = require('debug');
import { stringify } from 'querystring';
// defintion of a logging descriptor
const publicendpointLog = debug('HelloWorldAPI:publicEndpoints');


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
      message:"API ALIVE AND AXIOS REQUEST OK- CHECK DOCUMENTATION FOR PROPER USAGE",
      currency: data.currency,
      priceUSD: data.rates.USD
      
    });
    
  })
  .catch(error => {
    publicendpointLog("Error: " + error);
    
    res.json({
      message:"API ALIVE - Error Detected"
      
    });
  });
});


routesPublic.post("/login",  (req, res) => {
  console.log("Entering Login Endpoint");
  controller.login(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )
  
});
  
// recover password. ( Needs to be a Post instead of a GET - It is intentionally a GET for Testing Purposes only)
routesPublic.get("/recover",  (req, res) => {

  controller.recover(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    ) 
  });

// OTP password. ( Needs to be a Post instead of a GET - It is intentionally a GET for Testing Purposes only)
routesPublic.get("/register",  (req, res) => {
    
  controller.register(req)
    .then( 
      (data)=> res.json({data})
      )
    .catch(
      (err)=> res.json({err})
    )

  });
  
  export default routesPublic;