import generateAccessToken from '../services/loginservice';

// debug library
import debug = require('debug');
// defintion of a logging descriptor
const publicendpointLog = debug('HelloWorldAPI:publicEndpoints');

interface loginResponse {
    token: string;
  }
  
  export default class publicController {

  
    public login = (req: any) => { 
          return new Promise <loginResponse> ( (resolve,reject) => {
          
            publicendpointLog('Got body:', req.body);
            publicendpointLog("Entering login: " + req.body.username)
          try {
            const token = generateAccessToken({ username: req.body.username });
            publicendpointLog("Token: " + token)
            resolve ({token:token});
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
