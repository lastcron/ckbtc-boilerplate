import pino from 'pino'
import pretty from 'pino-pretty'
import PinoHttp, { pinoHttp } from 'pino-http'
import dotenv from 'dotenv'
dotenv.config()

const logger =
  process.env.NODE_ENV === 'development'
    ? pino(pretty({ colorize: true }))
    : pino()
const httpLogger =
  process.env.NODE_ENV === 'development'
    ? PinoHttp(pretty({ colorize: true }))
    : pinoHttp()

export { logger, httpLogger }
