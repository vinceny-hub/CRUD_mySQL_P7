const db = require("../models");

let Role = db.role



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
  })
   }
   module.exports = initial();