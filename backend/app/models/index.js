// const dbConfig = require("../config/db.config.js");
const dbConfig = require("../config/config.json");

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {  // database parameters declaration 
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: 0,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

const sequelize = new Sequelize("database_development", "administrator", "admin", {  // database parameters declaration 
   host: "127.0.0.1",
   dialect: "mysql",
   operatorAliases: false
  //   operatorsAliases: 0,
  
  //   pool: {
  //     max: dbConfig.pool.max,
  //     min: dbConfig.pool.min,
  //     acquire: dbConfig.pool.acquire,
  //     idle: dbConfig.pool.idle
  //   }
   });

const db = {};                    // Sequelize from db models

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);


// associate posts/users

// db.user.hasMany(db.posts, {
//   foreignKey: {
//     allowNull: false
//   }, onDelete:'CASCADE', 
// }),

db.posts.belongsTo(db.user, {
  foreignKey: {
    allowNull: false
  }, onDelete:'CASCADE', 
}),

// associate comments/user

// db.user.hasMany(db.comments, {
//   foreignKey: {
//     allowNull: false
//   }, onDelete:'CASCADE', 
// }),

db.comments.belongsTo(db.user, {
  foreignKey: {
    allowNull: false
  }, onDelete:'CASCADE', 
}),

// associate comments/posts

// db.posts.hasMany(db.comments, {
//   foreignKey: {
//     allowNull: false
//   }, onDelete:'CASCADE', 
// }),

db.comments.belongsTo(db.posts, {
  foreignKey: {
    allowNull: false
  }, onDelete:'CASCADE', 
}),

// db.posts.belongsTo(db.user, {as:"User", foreignKey: "userId"})

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

//  Associations






module.exports = db;
// global.sequelize = sequelize;


