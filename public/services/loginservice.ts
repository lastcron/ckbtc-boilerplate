import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function generateAccessToken(user: any) {
    
    //****************** */
    //Extract user objet parameters
    // Implement sequalize or mongodb
    //Check if the username is authorized against your database
    //***************** */

    return jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: '1800s' });

}

export default generateAccessToken;