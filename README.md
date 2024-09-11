HI, this is backend API project , this project will be able to serve requests that are
mostly required for a typical E-Commerce website

## Project Flow:

This project is basically a express server , that can

#### 1. show the items list present in MongoDB database

#### 2. Log in / Sign Up the user

#### 3. show the cart of a logged in user

## to run server, execute command

`npm run dev` (must have installed node_modules already)

## details on how the functionality is run

server get initialized in the index.js file, whenever a request comes it,

#### 1. first passes through cors middleware, this middleware is used to allow cross origin requests.

#### 2. second it passes through logger middleware , this middleware just logs the request info to keep track of requests.

#### 3. third we defines all our main routes('/user','/item','/cart')

#### 4. cart route have a additional middleware to verify if user is logged in or not.

#### 4. the error handler middleware.

mostly request goes through middlware in sequence, except when error occurs , in that case control directly reaches Error handler middleware.

## MongoDB database

#### 1. mongoose package is used to connect to database in the index.js file through import of db.js.

#### 2. after connecting to the db, we can directly run queries in database using model of particular object.
