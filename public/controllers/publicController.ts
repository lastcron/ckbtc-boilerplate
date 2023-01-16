import generateAccessToken from '../services/loginservice';

// debug library
import debug = require('debug');
// defintion of a logging descriptor
const publicendpointLog = debug('HelloWorldAPI:publicEndpoints');

interface loginResponse {
    result: string,
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
                    token:token
                  });
              }
              else {
                publicendpointLog("User and Password invalid ")
                
                resolve({
                  result: "Usuario Invalido",
                  token:token
                });

              }
              }

              resolve({
                result: "Acceso Concedido",
                token:token
              });

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
