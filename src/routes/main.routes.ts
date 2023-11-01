import { Router } from 'express';

const publicRoute = Router();
const privateRoute = Router();

/* 
 PRIVATE ROUTES  
 *********************************************
*/


privateRoute.get('/', () => { });

privateRoute.get('/user-balance', () => { });

privateRoute.get('/paymentrequest', () => { });

privateRoute.get('/payment-status', () => { });

privateRoute.get('/payment-received', () => { });

privateRoute.get('/payments-history', () => { });

/* 
 PUBLIC ROUTES  
 *********************************************
*/

publicRoute.get('/', () => { });

publicRoute.post('/login', () => { });

publicRoute.post('/refresh', () => { });

publicRoute.post('/recover', () => { });

publicRoute.post('/register', () => { });

export { publicRoute, privateRoute };