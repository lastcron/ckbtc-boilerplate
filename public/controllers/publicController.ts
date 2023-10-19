import {generateAccessToken,generateRefreshToken} from '../services/loginservice';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// debug library
import debug from 'debug';
import session from'express-session';
// defintion of a logging descriptor
const publicendpointLog = debug('ckBTC-PaymentConnector:publicEndpoints');

interface loginResponse {
    result: string,
    token: string,
    refreshToken: string
  }
  
  export default class publicController {

  
    public login = (req: any): Promise<loginResponse> => {
      return new Promise<loginResponse>((resolve, reject) => {
        try {
          // Log the raw body and entering message
          publicendpointLog('Raw Body:', req.rawBody);
          publicendpointLog('Got body:', req.body);
          publicendpointLog("Entering login ");
    
          // Enable this authentication method if you are using dynamic users
          if (false) {

            // Extract user and password from the request body
          const user = req.body.username;
          const password = req.body.password;
    
          // Check if user and password are provided
          if (!user || !password) {
            resolve({
              result: "Invalid User or Password",
              token: '',
              refreshToken: ''
            });
            return;
          }

            const myusername = "usertest";
            const mypassword = "password";
    
            if (req.body.username == myusername && req.body.password == mypassword) {
              publicendpointLog("User and Password are valid ");
    
              // Generate tokens and handle session
              const token = generateAccessToken({ username: req.body.username });
              const refreshToken = generateRefreshToken({ username: req.body.username });
              publicendpointLog("Token: " + token);
    
              publicendpointLog("Req Session: " + req.session);
              if (req.session){
              const session = req.session;
              session.user = req.body.username;
              publicendpointLog("Session: " + session.user);
              }
              
              resolve({
                result: "Valid User",
                token: token,
                refreshToken: refreshToken
              });

            } else {
              publicendpointLog("User and Password invalid ");
              resolve({
                result: "User not authorized",
                token: '',
                refreshToken: ''
              });
            }
          } else {
            // Check if static API KEY is valid
            const static_apikey = process.env.APIKEY;
            publicendpointLog("Header ApiKey : " + req.headers.apikey);
            publicendpointLog("Static ApiKey : " + static_apikey);
    
            if (static_apikey == req.headers.apikey) {
              // Generate tokens for authorized user
              const token = generateAccessToken({ username: req.body.username });
              const refreshToken = generateRefreshToken({ username: req.body.username });
              publicendpointLog("Token: " + token);
    
              resolve({
                result: "User Authorized",
                token: token,
                refreshToken: refreshToken
              });
            } else {
              // Handle invalid API Key
              resolve({
                result: "Invalid ApiKey",
                token: '',
                refreshToken: ''
              });
            }
          }
        } catch (error) {
          // Handle unexpected errors
          reject({ error: "Login unexpected error" , message: error});
        }
      });
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
