
// importing sequelize connection and libraries
import { Sequelize,Op, Model, DataTypes } from 'sequelize'
import sequelizeConnection from '../../db/config';
const sequelize = sequelizeConnection;
import User from '../../db/models/user';
import {create} from '../services/transactionService';

// debug library
import debug = require('debug');
// defintion of a logging descriptor
const protectedEndpointLog = debug('ckBTC-PaymentConnector:protectedEndpoints'); 
   
   export default class publicController {


//Query AUTH Status
    public authstatus =  (req: any) => { 
          return new Promise <any> ( async (resolve,reject) => {
        
          try {
            protectedEndpointLog('Got body:', req.body);
            protectedEndpointLog("Entering authStatus")
            //Make this true to enable session confirmation on this route
            if (false){
              let session=req.session;
              
              if(session.user){
                resolve ({message:"Authorization - PASSED, User: " + session.user});
              } else
                resolve ({message:"Authorization - FAILED"});
            }

            const usercount = await User.findAndCountAll();
            let dbstatus= false;
            if (usercount.count > 0){
              dbstatus = true;
            } else {
              dbstatus = false;
            }
            


            resolve ({message:"Authorization - PASSED",dbstatus:dbstatus});

          }
          catch{

            reject ({error:"Auth unexpected error"});

          }
          })
    };
//Query Balance for a user
    public user_balance = (req: any) => { 

      return new Promise <any> ( (resolve,reject) => {
        
        try {
        protectedEndpointLog("Entering Controller UserBalance")
        protectedEndpointLog('Request Query Paramas: ',req.query);
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog('----------------------');

        if(req.query.user){
          protectedEndpointLog('User: ',req.query.user)
          const user=req.query.user;
         //Check address on the database

         
         //Make a request to the blockchain to check balance
         resolve ({message:"protected-UserBalance is X"});

        }else{
          reject ({error:"User missing on request"});
        }
      
      
        
      }
      catch{
        reject ({error:"User Balance unexpected error"});
      }
      })

    };

//Query Payment information for a user from the database. Gets user address and creates a transaction with a pending state 
    public payment_request = (req: any) => { 
      return new Promise <any> ( (resolve,reject) => {
        try {
        protectedEndpointLog("Entering Controller payment_request")
        protectedEndpointLog('Request Query Paramas: ',req.query);
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog('----------------------');
        
        if(req.query.user && req.query.amount && req.query.terminal){
          protectedEndpointLog('User: ',req.query.user)
          protectedEndpointLog('Amount : ',req.query.amount)
          protectedEndpointLog('Terminal : ',req.query.terminal)
          const user=req.query.user;
          const amount=req.query.amount;
          const terminal=req.query.terminal;
         //save payment request with status pending on the database
         const payload: TransactionAttributes = {

         }

         transactionService.create(payload);
         
         //return object with qrcode and paymentid

         resolve ({address:"protected payment_request",payment_id:"XXX"});

        }else{
          reject ({error:"User , Amount or Terminal missing on request"});
        }

        
      }
      catch{
        reject ({error:"payment_request unexpected error"});
      }
      })

    };

// Query the Status of a Transaction on the blockchain and saves it to database
    public payment_status = (req: any) => { 
      return new Promise <any> ( (resolve,reject) => {
        try {
        protectedEndpointLog("Entering payment_status")
        protectedEndpointLog('Request Query Paramas: ',req.query);
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog('----------------------');
        
        if(req.query.user && req.query.payment_id ){
          protectedEndpointLog('User: ',req.query.user)
          protectedEndpointLog('Payment_id : ',req.query.payment_id)
          
          const user=req.query.user;
          const payment_id=req.query.payment_id;
          
         //Check payment_id status on the database

         
         //return object with payment satus

         resolve ({status:"Not Payed",payment_id:"XXX"});

        }else{
          reject ({error:"User or Payment ID missing on request"});
        }
      
        
      }
      catch{
        reject ({error:"payment_status unexpected error"});
      }
      })

    };

//Query the Status of a Transaction on the database

    public payment_received = (req: any) => { 
      return new Promise <any> ( (resolve,reject) => {
        try {
        protectedEndpointLog("Entering payment_received")
        protectedEndpointLog('Request Query Paramas: ',req.query);
        protectedEndpointLog('Got body:', req.body);
        protectedEndpointLog('----------------------');
      
        if(req.body){
          protectedEndpointLog('Body: ',req.body)
          
          const payment=req.body.payment;
         
         //update payment  on the database


         resolve ({Status:"Received"});

        }else{
          reject ({error:"Body missing on request"});
        }


        resolve ({message:"protected payment_received"});
      }
      catch{
        reject ({error:"payment_received unexpected error"});
      }
      })

    };

//Query the Payment History for  a user

public payment_history= (req: any) => { 
  return new Promise <any> ( (resolve,reject) => {
    try {
    protectedEndpointLog("Entering payment_history")
    protectedEndpointLog('Request Query Paramas: ',req.query);
    protectedEndpointLog('Got body:', req.body);
    protectedEndpointLog('----------------------');
  
    if(req.query.user){
      protectedEndpointLog('user: ',req.query.user)
      
      const user=req.query.user;
     
     //check history  on the database

     // Return object with the history of payment


     resolve ({history:"[]"});

    }else{
      reject ({error:"User missing on request"});
    }

  }
  catch{
    reject ({error:"payment_history unexpected error"});
  }
  })

};
    

}
