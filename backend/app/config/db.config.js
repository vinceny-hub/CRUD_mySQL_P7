module.exports = {
  HOST: "localhost",
  USER: "administrator",
  PASSWORD: "admin",
  DB: "p7db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};