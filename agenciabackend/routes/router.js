const express = require("express");
const routerApp = express.Router();

const appAgencia = require("../apps/agencia/controller/ctlAgencia");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

//Rotas de Agencia
routerApp.get("/GetAllAgencia",  appAgencia.GetAllAgencia);
routerApp.post("/GetAgenciaByID", app.Login.AutenticaJWT, appAgencia.GetAgenciaByID);
routerApp.post("/InsertAgencia", app.Login.AutenticaJWT, appAgencia.InsertAgencia);
routerApp.post("/UpdateAgencia", app.Login.AutenticaJWT, appAgencia.UpdateAgencia);
routerApp.post("/DeleteAgencia", app.Login.AutenticaJWT, appAgencia.DeleteAgencia);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
