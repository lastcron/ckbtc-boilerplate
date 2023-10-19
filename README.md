## ckBTC-PaymentConnector
PUBLIC ENDPOINTS 
/ - Checks API Status  
/login - In case a dynamic user validation is integrated  
/refresh - In case a dynamic user validation is integrated   
/recover - In case a dynamic user validation is integrated  
/register - - In case a dynamic user validation is integrated  

PROTECTED ENDPOINTS  
Protected endpooints require an 'authorization' headers with the JWT token returned by the public /login enddpoint suffixed by the word "bearer"  

/app/ - Query AUTH Status  
/app/user-balance - Query Balance for a user  
/app/payment-request - Query Payment information for a user from the database. Gets user address and creates a transaction with a pending state  
/app/payment-status - Query the Status of a Transaction on the blockchain and saves it to database  
/app/payment-received - Query the Status of a Transaction on the database  
/app/payment-history - Query the payment history for the user  

TESTING JWT TOKEN  
eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJja0JUQyIsIlVzZXJuYW1lIjoiY2tCVENBcGkiLCJleHAiOjE5MTY5NzM2NjMsImlhdCI6MTY5NjA0ODg2M30  

MySQL CONTAINER COMMAND FOR TESTING  
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=password -d mysql:tag  

##### VERY Important Notes. READ BEFORE IMPLEMENTING  

This Restufl API has been built with production grade quality aimed to distributed infrastructuress in mind. Below is a detailed summary of the Best Practices taken in place:  

* FOR QUICK TESTING OPEN POSTMAN AND MAKE A GET REQUEST TO  127.0.0.1:3000  

* This API will be behind a reverse proxy server like Nginx which will take care of:  
    + Reverse Proxying  
    + Load Balancing  
    + SSL Certificates for secure https communication  
* This API will be deployed using a docker container therefore  process manager PM2 is not implemented  
* Login Session storage in REDIS is implemented but is optional , you can also persist on MongoDB but the connector is not installed. Redis Disabling is done in line 32 of index.ts  
* Cookie Parser library has been implemented in order make session persistance work  
* Rate Limiting has been implemented  
* Dockerfile is ready and only exports the dist folder  
* Folder Structure follows a standarized MVC template for REST APIs  
* Routes , Controllers and Services are in separated files for each component  
* Public and Protected endpoints are treated in separate components  
* Controllers are built as promises  
* Debug Package has been implemented , define your own namespaces and check the commands in package.json. Run dev environmene with: npm run rundev  
* TypeScript is being used for writing code  
* Junit for Testing and command for test monitoring is in place  
* --PENDING Unit Tests for the existing endpoints are implemented  
* Express and Body-Parser libs installed and working. RawBody parser besides json has been implemented. Check line 101 in index.ts  
* git.ignore already configure to prevent node_modules and coverage to be uploaded  
* yarn package manager installed in dev dependencies  
* nodemon already installed in dev dependencies  
* environment variables  package configure and loaded * YOU NEED TO CREATE A .ENV FILE ON YOUR ROOT  
* treblle.com for Api monitoring and documentation is installed * ADD YOUR API KEY IN THE .ENV FILE  
* CORS  is implemented in all endopoints  
* GZIP Compression enabled  
* JWT Token has been implmented along with public endpoints and protected endpoints. * Change Token secret and Refresh Secert on the .env file  
* Morgan package added which Log requests to console  
* A separated version of this API using GraphQL is being done  
* Axios Installed for externarl api requests  


##### Next Steps for connecting to your database.:  
* If using any SQL Data layer for persistance,  next step would be to add Sequalize. https://sequelize.org/docs/v6/getting-started/   
* If using NoSQL like MongoDB for persistance , next step would be to add the connector  
* npm install --save pg pg-hstore # Postgres  
* npm install --save mysql2  
* npm install --save mariadb  
* npm install --save sqlite3  
* npm install --save tedious # Microsoft SQL Server  

