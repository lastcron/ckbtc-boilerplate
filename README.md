## NodeJS Express API REST Boiler Plate

License: unlicensed

##### Important Notes

This Restufl API has been built with production grade quality aimed to distributed infrastucutures in mind. Below is a detailed summary of the Best Practices taken in place:

* This API will be behind a reverse proxy server like Nginx which will take care of:
    + Reverse Proxying
    + Load Balancing
    + SSL Certificates for secure https communication
* This API will be deployed using a docker container therefore  process manager PM2 is not implemented
* --PENDING Login Session storage in REDIS is implemented but is optional , you can also persist on MongoDB but the connector is not installed
* --PENDING Rate Limiting has been implemented
* Dockerfile is ready and only exports the dist folder
* Folder Structure follows a standarized MVC template for REST APIs
* Routes , Controllers and Services are in separated files for each component
* Public and Protected endpoints are treated in separate components
* Controllers are built as promises
* Debug Package has been implemented , define your own namespaces and check the commands in package.json
* 
* TypeScript is being used for writing code
* Junit for Testing and command for test monitoring is in place
* --PENDING Unit Tests for the existing endpoints are implemented
* Express and Body-Parser libs installed and working
* git.ignore already configure to prevent node_modules and coverage to be uploaded
* yarn package manager installed in dev dependencies
* nodemon already installed in dev dependencies
* environment variables  package configure and loaded * YOU NEED TO CREATE A .ENV FILE ON YOUR ROOT
* treblle.com for Api monitoring and documentation is installed * ADD YOUR API KEY IN THE .ENV FILE
* CORS  is implemented in all endopoints
* GZIP Compression enabled
* JWT Token has been implmented along with public endpoints and protected endpoints
* Morgan package added which Log requests to console
* A separated version of this API using GraphQL is being done


##### Next Steps:
* If using any SQL Data layer for persistance,  next step would be to add Sequalize. https://sequelize.org/docs/v6/getting-started/ 
* If using NoSQL like MongoDB for persistance , next step would be to add the connector

