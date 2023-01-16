import express from 'express';
import jwtconfirmation from '../services/jwtconfirmation';
import protectedController from '../controllers/protectedController';

const routesProtected = express.Router();
const controller = new protectedController();

// Route for Global Dashboard - Protected by the JWT Middleware
routesProtected.get("/", jwtconfirmation , (req, res) => {
   
  console.log("Entering protected route ")
    
  controller.maindashboard(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });
  
// Route for Module 1 Dashboard - Protected by the JWT Middleware
routesProtected.get("/module1", jwtconfirmation , (req, res) => {
    
  console.log("Entering protected route - Module 1 ")
    
  controller.module1(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });

// Route for Module 2 Dashboard - Protected by the JWT Middleware
routesProtected.get("/module2",jwtconfirmation, (req, res) => {
    
  console.log("Entering protected route - Module 2 ")
    
  controller.module2(req)
    .then( 
      (data)=> res.json ({data})
      )
    .catch(
      (err)=> res.json ({err})
    )

  });
  
  export default routesProtected;