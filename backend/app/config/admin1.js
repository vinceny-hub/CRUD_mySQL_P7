

const db = require("../models");
const bcrypt = require("bcrypt");

const User = db.user;

// Fonction qui crée le compte admin dans la base de données à la connexion s'il n'existe pas
function setAdmin(req, res) {
  User.findOne({ where: { email: "admin@live.fr" } || { username: "admin" } })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash("ADMIN", 10)
          .then((hash) => {
            const admin = User.create({
              username: "admin",
              email: "admin@live.fr",
              password: hash,
              roles: ['admin', 'user']
            })
              .then((admin) => {
                console.log({
                  admin,
                  message: `Votre compte admin est bien créé ${admin.username} !`,
                });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "l'admin est déjà créé" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = setAdmin();