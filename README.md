# Storefront Backend Project



## Required Technologies
The application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from yarn for managing environment variables
- db-migrate from yarn for migrations
- jsonwebtoken from yarn for working with JWTs
- jasmine from yarn for testing

## Package installation
``
run -> yarn install 
``


## Scripts Used
```sh
build -> to compile TS files to JS files into dist Dir "yarn run build"
start -> run the server "yarn run start"
dev   -> nodemon package to run and refresh the server every time the code changed and saved "yarn run dev"
lint  -> get any error with syntax stylish using eslint configurations "yarn run lint"
lint:f -> fix all the error of syntax stylish "yarn run lint:f"
prettier -> formate code stylish using prettier configurations "yarn run prettier"
test -> only test the suites test with jasmine "yarn run test"
```


###  Plan to Meet Requirements (Endpoints & Database Schema)

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

###  Database Creation

```sh
# create user
CREATE USER username WITH PASSWORD 'password';

# create Database
CREATE DATABASE storefront; CREATE DATABASE storefront_test;

# grant all databases to the user
GRANT ALL PRIVILEGES ON DATABASE storefront TO username; GRANT ALL PRIVILEGES ON DATABASE storefront_test TO username;
```

### Database Migrations
```sh
# Migrations used in this repo
db-migrate create add-users-table --sql-file
db-migrate create add-products-table --sql-file
db-migrate create add-orders-table --sql-file
db-migrate create add-orders-products-table --sql-file
# to create the same data schema run this command to create all tables 
db-migrate up
# to drop the data schema tables run this command to drop each table separately
db-migrate down
# to reset the data schema tables run this command
db-migrate reset
```

### Environmental Variables (.env file contents)
```sh
# to connect with the database use the following environmental variables
  PORT ==> the server running on the port of your choice
  POSTGRES_HOST ==> the host of the database
  POSTGRES_PORT ==> the port of the database default is 5432
  POSTGRES_DB ==> name of the database  
  POSTGRES_DB_TEST ==> name of the test database 
  POSTGRES_USER ==> the user name or the owner of the database
  POSTGRES_PASSWORD ==> password of the database
  ENV ==> dev
  BCRYPT_PASSWORD ==> pepper text to hash the password
  SALT_ROUNDS ==> how many round for  salting the password 
  TOKEN_SECRET ==> secret text for token 

```
  


