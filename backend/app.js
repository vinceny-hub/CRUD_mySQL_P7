
const express = require('express') // framework node.js
const bodyParser = require('body-parser') //  JSON objects 

const path = require('path')   // path of files
// const dotenv = require('dotenv').config() // module whom hides connexion datas 
const helmet = require('helmet')   // helps to secure Express apps by setting various HTTP headers



const app = express()

app.use((req, res, next) => {   // headers access informations
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
    })


// protection X-XSS -activate a script filter for (XSS) on websites-
app.use(helmet())


const db = require("./app/models/index"); // get db from models and sequelize
 db.sequelize.sync();

// const dblogin = require("./app/modelsUser/index");
const Role = db.role;

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });
initial();

function initial() {  // Roles indexes
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}


//  POST request format to JSON
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ****

const postRoutes = require("./app/routes/post.routes"); // get route post
const commentRoutes = require("./app/routes/comment.routes") // get route comments
const commentPostRoutes = require("./app/routes/commentPost.routes") // get route delete a comment of a post
const userManageRoutes = require("./app/routes/userManage.routes")


require('./app/routes/auth.routes')(app);  // autjentification route
require('./app/routes/user.routes')(app);  // user connxion route


app.use('/images', express.static(path.join(__dirname,'images')))  // image path/ route path
app.use('/api/posts', postRoutes); // post route path
app.use('/api/user', userManageRoutes); // user modification route path
app.use('/api/comment', commentRoutes); // comment route path
app.use('/api/comments', commentPostRoutes); // route path to delete a comment of a post


module.exports = app

