import App from "./index";
import PublicRoutes from "../public/routes/publicroutes";
import ProtectedRoutes from "../protected/routes/protectedroutes";

import { publicRoute, privateRoute } from "./routes/main.routes";

// debug library
import debug = require('debug');
// defintion of a logging descriptor
const server = debug('ckBTC-PaymentConnector:server');


// Defines the port where the API is going to be served. It looks up first if there is a env variable named PORT 
// available , otherwise defaults to port 3000. Change it accoring to your needs.
const port = process.env.PORT || '3000';

//Imports the files with routes definitions
// App.use('/', PublicRoutes);
// App.use('/app', ProtectedRoutes);

App.use('/', publicRoute)
App.use('/app', privateRoute)

//Starts the express server
App.listen(port, async () => {
  server("Server listening on Port: ", port);
  console.log("server on port: " + port)
  // try {
  //     await sequelizeConnection.authenticate();
  //     console.log('Connection to database has been established successfully.');
  //     //Checks if the User tables exits otherwise it creates it. If the NODE_ENV file is set to 'development' it will alsto apply any new 
  //     //changes of the model.
  //     const isDev = process.env.NODE_ENV === 'development';

  //     const dbInit = () => {
  //      //Create Database ckbtc

  //      //Create  Tables if they do not exist (Only if isDev is = to TRUE )
  //     User.sync({ alter: isDev });
  //     Merchant.sync({ alter: isDev });
  //     Transaction.sync({ alter: isDev });
  //     Terminal.sync({ alter: isDev });

  //     console.log('Tables sinchronization successfully done');
  //     }

  //     dbInit();


  //   } catch (error) {
  //     console.error('Unable to connect to the database:', error);
  //   }
})


