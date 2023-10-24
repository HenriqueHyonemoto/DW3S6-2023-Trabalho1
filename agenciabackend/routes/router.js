const express = require("express");
const routerApp = express.Router();

const appAgencia = require("../apps/agencia/controller/ctlAgencia");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

//Rotas de Agencia
routerApp.get("/GetAllAgencia", appAgencia.GetAllAgencia);
routerApp.post("/GetAgenciaByID", appLogin.AutenticaJWT, appAgencia.GetAgenciaByID);
routerApp.post("/InsertAgencia", appLogin.AutenticaJWT,   appAgencia.InsertAgencia);
routerApp.post("/UpdateAgencia", appLogin.AutenticaJWT,   appAgencia.UpdateAgencia);
routerApp.post("/DeleteAgencia", appLogin.AutenticaJWT,   appAgencia.DeleteAgencia);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
