
var express = require('express');
var agenciasApp = require("../app/agencias/controller/ctlagencias")

////var login = require("../controllers/login/login")
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
router.get('/', authenticationMiddleware, agenciasApp.getAllagencias);
router.get('/openAgenciasInsert', authenticationMiddleware, agenciasApp.openagenciasInsert);
router.get('/openAgenciasUpdate/:id', authenticationMiddleware, agenciasApp.openagenciasUpdate);

/* POST métodos */
router.post('/insertagencias', authenticationMiddleware, agenciasApp.insertagencias);
router.post('/getDados', authenticationMiddleware, agenciasApp.getDados);
router.post('/updateagencias', authenticationMiddleware, agenciasApp.updateagencias);
router.post('/deleteagencias', authenticationMiddleware, agenciasApp.deleteagencias);




module.exports = router;