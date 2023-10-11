var express = require('express');
var agenciaApp = require("../app/agencia/controller/ctlAgencia")

//var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/', authenticationMiddleware, agenciaApp.getAllAgencia);
router.get('/openAgenciaInsert', authenticationMiddleware, agenciaApp.openAgenciaInsert);
router.get('/openAgenciaUpdate/:id', authenticationMiddleware, agenciaApp.openAgenciaUpdate);

/* POST métodos */
router.post('/insertAgencia', authenticationMiddleware, agenciaApp.insertAgencia);
router.post('/getDados', authenticationMiddleware, agenciaApp.getDados);
router.post('/updateAgencia', authenticationMiddleware, agenciaApp.updateAgencia);
router.post('/deleteAgencia', authenticationMiddleware, agenciaApp.deleteAgencia);




module.exports = router;