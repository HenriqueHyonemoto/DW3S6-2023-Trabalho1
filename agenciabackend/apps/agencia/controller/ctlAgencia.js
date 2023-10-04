const mdlAgencia = require("../model/mdlAgencia");

const GetAllAgencia = (req, res) =>
  (async () => {
    let registro = await mdlAgencia.GetAllAgencia();
    res.json({ status: "ok", registro: registro });
  })();

const GetAgenciaByID = (req, res) =>
  (async () => {
    const agenciaID = parseInt(req.body.agenciaid);
    let registro = await mdlAgencia.GetAgenciaByID(agenciaID);

    res.json({ status: "ok", registro: registro });
  })();

const InsertAgencia = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAgencia.InsertAgencia(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateAgencia = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAgencia.UpdateAgencia(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteAgencia = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAgencia.DeleteAgencia(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  GetAllAgencia,
  GetAgenciaByID,
  InsertAgencia,
  UpdateAgencia,
  DeleteAgencia
};
