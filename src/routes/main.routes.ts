import { Router } from 'express'
import {
  getUserBalance,
  createPaymentRequest,
  getPaymentStatus,
  getPaymentReceived,
  getPaymentHistory,
} from '../controllers/main.controller'

const publicRoute = Router()
const privateRoute = Router()

/* 
 PRIVATE ROUTES  
 *********************************************
*/

privateRoute.get('/', () => {
  console.log('Hello this is v1')
})

privateRoute.get('/user-balance/:uid', getUserBalance)

privateRoute.get('/payment-status', getPaymentStatus)

privateRoute.get('/payment-received', getPaymentReceived)

privateRoute.get('/payment-history/:uid', getPaymentHistory)

privateRoute.post('/payment-request', createPaymentRequest)

/* 
 PUBLIC ROUTES  
 *********************************************
*/

publicRoute.get('/', () => {})

publicRoute.post('/login', () => {})

publicRoute.post('/refresh', () => {})

publicRoute.post('/recover', () => {})

publicRoute.post('/register', () => {})

export { publicRoute, privateRoute }
