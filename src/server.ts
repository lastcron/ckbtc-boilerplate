import App from './index'
import { publicRoute, privateRoute } from './routes/main.routes'

// debug library
import debug = require('debug')
// defintion of a logging descriptor
const server = debug('ckBTC-PaymentConnector:server')

// Defines the port where the API is going to be served. It looks up first if there is a env variable named PORT
// available , otherwise defaults to port 3000. Change it accoring to your needs.
const port = process.env.PORT || '3000'

//Imports the files with routes definitions
// App.use('/', PublicRoutes);
// App.use('/app', ProtectedRoutes);

App.use('/', publicRoute)
App.use('/app', privateRoute)

//Starts the express server
App.listen(port, async () => {
  server('Server listening on Port: ', port)
  console.log('server on port: ' + port)
})
