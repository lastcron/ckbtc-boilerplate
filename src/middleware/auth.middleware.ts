import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

const verifyJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1] || ''

  if (!token) return res.status(401).send({ message: 'Invalid token' })

  jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret, (err) => {
    if (err) {
      return res.status(403).send({ err, message: 'Invalid access' })
    }
    next()
  })
}

export { verifyJwtToken }
