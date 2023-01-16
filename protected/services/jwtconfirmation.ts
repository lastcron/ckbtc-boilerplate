import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//Loding env variables
dotenv.config();

//function that authenticates the JWT Token
function authenticateToken(req:any , res: any, next: any) {
  
  //Check if the authorization header is present in the request 
  const authHeader = req.headers['authorization']

  //Parse the header , split it and get the second position of the array ( [0],[1] )
  const token = authHeader && authHeader.split(' ')[1]

  // check if the token is not null otherwise return a 401 - Unauthorized
  if (token == null) return res.sendStatus(401)
  
  // check if the token is a valid jwt generated with the original TokenSecret
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    
    
    if (err) {
        //If there is an error show it on the console and return a 403
        console.log(err)
        return res.sendStatus(403)
    } else {
        //if the token is valid asign the user to the req.user object
        console.log(user)
        req.user = user
        
    }
    // continue execution
    next()
    

  })
}

export default authenticateToken;