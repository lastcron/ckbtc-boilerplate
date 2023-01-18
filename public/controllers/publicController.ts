import {generateAccessToken,generateRefreshToken} from '../services/loginservice';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// debug library
import debug = require('debug');
// defintion of a logging descriptor
const publicendpointLog = debug('HelloWorldAPI:publicEndpoints');

interface loginResponse {
    result: string,
    token: string,
    refreshToken: string
  }
  
  export default class publicController {

  
    public login = (req: any) => { 
          return new Promise <loginResponse> ( (resolve,reject) => {
          
            publicendpointLog('Got body:', req.body);
            publicendpointLog("Entering login: " + req.body.username)

          try {
            const token = generateAccessToken({ username: req.body.username });
            const Refreshtoken = generateRefreshToken({ username: req.body.username });
            
               

            publicendpointLog("Token: " + token)
            
              //Make the following true to enable session storage in ready. Requires to enable Redis on index.ts
              if (true){
                // this variables are just for testing purposes - a database query goes here
                let myusername = "usertest";
                let mypassword = "password";

                if(req.body.username == myusername && req.body.password == mypassword){
                  
                  publicendpointLog("User and Password are valid ")

                  let session=req.session;
                  session.user=req.body.username;

                  
                  publicendpointLog( "Session: " + session.user)
                  
                  resolve({
                    result: "Usuario Valido",
                    token:token,
                    refreshToken: Refreshtoken
                  });
              }
              else {
                publicendpointLog("User and Password invalid ")
                
                resolve({
                  result: "Usuario Invalido",
                  token:token,
                  refreshToken: Refreshtoken
                });

              }
              }

              resolve({
                result: "Acceso Concedido",
                token:token,
                refreshToken: Refreshtoken
              });

          }
          catch{
            reject ({error:"Login unexpected error"});
          }
          })
    };

    public refresh = (req: any) => { 
      return new Promise ( (resolve,reject) => {
      
        publicendpointLog("Entering refresh ")

      try {
        
        

        if (req.cookies?.jwt) {

          // Destructuring refreshToken from cookie
          const refreshToken = req.cookies.jwt;
          publicendpointLog("RefreshToken: " + refreshToken)
          // Verifying refresh token
          jwt.verify(refreshToken, process.env.REFRESH_SECRET as string, 
          (err: any, decoded: any) => {
              if (err) {
                  // Wrong Refesh Token
                  resolve ({
                    message: 'Unauthorized',
                    ResponseCode: '406',
                    Token:'NA'
                  })
              }
              else {
                  // Correct token we send a new access token
                  const accessToken = jwt.sign({
                      username: req.body.username,
                  }, process.env.TOKEN_SECRET as string, {
                      expiresIn: '10m'
                  });
                  resolve ({
                    message: 'Authorized',
                    ResponseCode: '200',
                    Token:accessToken
                  })
              }
          })
      } else {
        publicendpointLog("No Cookies")
        resolve ({
          message: 'Unauthorized',
          ResponseCode: '406',
          Token:'NA'
        })
      }

      }
      catch{
        reject ({error:"Login unexpected error"});
      }
      })
};
    

    public  recover = (req: any) => {
    return new Promise <any> ((resolve,reject) => {

      publicendpointLog('Got body:', req.body);
      publicendpointLog("Entering recover: ");
        resolve ({message:"Recover Password"});

      })
    } 

    public  register = (req: any) => {
      return new Promise <any> ((resolve,reject) => {
  
        publicendpointLog('Got body:', req.body);
        publicendpointLog("Entering register: ");
          resolve ({message:"Registration"});
  
        })
      } 


}
