import express from 'express';
import jwtconfirmation from '../services/jwtconfirmation';
import protectedController from '../controllers/protectedController';

const routesProtected = express.Router();
const controller = new protectedController();

// Route for Global Dashboard - Protected by the JWT Middleware
routesProtected.get("/", jwtconfirmation , (req, res) => {
   
  console.log("Entering protected route ")
    
  controller.authstatus(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });
  
// Route for Query Balance for a user - Protected by the JWT Middleware
routesProtected.get("/user-balance", jwtconfirmation , (req, res) => {
    
  console.log("Entering protected route - user-balance ")
    
  controller.user_balance(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });

// Route for Querying Payment information for a user from the database. Gets user address and creates a transaction with a pending state - Protected by the JWT Middleware
routesProtected.get("/payment-request",jwtconfirmation, (req, res) => {
    
  console.log("Entering protected route - payment-request ")
    
  controller.payment_request(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });

// Route for Querying the Status of a Transaction on the blockchain and saves it to database - Protected by the JWT Middleware
routesProtected.get("/payment-status",jwtconfirmation, (req, res) => {
    
  console.log("Entering protected route - payment-status ")
    
  controller.payment_status(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });

// Route for Querying the Status of a Transaction on the database- Protected by the JWT Middleware
routesProtected.get("/payment-received",jwtconfirmation, (req, res) => {
    
  console.log("Entering protected route - payment-received ")
    
  controller.payment_received(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });


  
  export default routesProtected;