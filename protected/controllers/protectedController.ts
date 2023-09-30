// debug library
import debug = require('debug');
// defintion of a logging descriptor
const protectedEndpointLog = debug('ckBTC-PaymentConnector:protectedEndpoints'); 
   
   export default class publicController {


//Query AUTH Status
    public authstatus = (req: any) => { 
          return new Promise <any> ( (resolve,reject) => {
          
            protectedEndpointLog('Got body:', req.body);
            protectedEndpointLog("Entering maindashboard: ")
          try {
            //Make this true to enable session confirmation on this route
            if (false){
              let session=req.session;
              
              if(session.user){
                resolve ({message:"Authorization - PASSED, User: " + session.user});
              } else
                resolve ({message:"Authorization - FAILED"});
            }
            
            resolve ({message:"Authorization - PASSED"});

          }
          catch{

            reject ({error:"Auth unexpected error"});

          }
          })
    };
//Query Balance for a user
    public user_balance = (req: any) => { 
      return new Promise <any> ( (resolve,reject) => {
      
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog("Entering Module 1: ")
      try {
        resolve ({message:"protected Module 1"});
      }
      catch{
        reject ({error:"Login unexpected error"});
      }
      })

    };

//Query Payment information for a user from the database. Gets user address and creates a transaction with a pending state 
    public payment_request = (req: any) => { 
      return new Promise <any> ( (resolve,reject) => {
      
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog("Entering payment_request: ")
      try {
        resolve ({message:"protected payment_request"});
      }
      catch{
        reject ({error:"payment_request unexpected error"});
      }
      })

    };

// Query the Status of a Transaction on the blockchain and saves it to database
    public payment_status = (req: any) => { 
      return new Promise <any> ( (resolve,reject) => {
      
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog("Entering payment_status: ")
      try {
        resolve ({message:"protected payment_status"});
      }
      catch{
        reject ({error:"payment_status unexpected error"});
      }
      })

    };

//Query the Status of a Transaction on the database

    public payment_received = (req: any) => { 
      return new Promise <any> ( (resolve,reject) => {
      
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog("payment_received: ")
      try {
        resolve ({message:"protected payment_received"});
      }
      catch{
        reject ({error:"payment_received unexpected error"});
      }
      })

    };
    

}
