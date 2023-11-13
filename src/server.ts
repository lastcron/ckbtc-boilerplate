import App from './index'
import { publicRoute, privateRoute } from './routes/main.routes'
import { logger } from './config/pino.config'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || '3000'

//Imports the files with routes definitions
App.use('/', publicRoute)
App.use('/app', privateRoute)

//Starts the express server
App.listen(port, async () => {
  logger.info('server on port: ' + port)
})
