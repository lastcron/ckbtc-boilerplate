
import express from 'express';
import dotenv from 'dotenv';
import publicController from '../controllers/publicController';


const routesPublic = express.Router();
const controller = new publicController();

// Get config vars
dotenv.config();

routesPublic.get("/", function (req, res) {

  res.json({
    message:"API ALIVE - CHECK DOCUMENTATION FOR PROPER USAGE"
  });

});


routesPublic.post("/login",  (req, res) => {
  
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