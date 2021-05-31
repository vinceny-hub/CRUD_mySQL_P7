CRUD_mySQL

First, clone this repository : 

git clone https://github.com/vinceny-hub/CRUD_mySQL.git

Frontend 
Type in the Frontend folder :

> cd frontend

> npm install

> npm run serve

if the navigator is not open automatically go to :

http://localhost:8081/

Backend 
Type in the Backend folder :

> cd backend

> npm install

> nodemon

Database MySQL 
Create a MySQL database like following in your MySQL path :

CREATE DATABASE p7db;

CREATE USER 'administrator'@'localhost' IDENTIFIED BY 'admin';

GRANT INSERT ON *.* 'administrator'@'localhost';


' Or you can use your own MySQL Database ' 

For that you can modify parameters as it is convenient for you in the file :

Backend/app/config/db.config.js

and modify fields USER, PASSWORD,  & DB as you configure your database

{ HOST: "localhost",
USER: "administrator",
PASSWORD: "admin",
DB: "p7db",
dialect: "mysql", }
