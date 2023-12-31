const db = require("../../../database/databaseconfig");

const GetAllAgencia = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM agencia where removido = false ORDER BY descricao ASC"
    )
  ).rows;
};

const GetAgenciaByID = async (agenciaIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM agencia WHERE agenciaid = $1 and removido = false ORDER BY descricao ASC",
      [agenciaIDPar]
    )
  ).rows;
};

const InsertAgencia = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO agencia " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          registroPar.numero_agencia,
          registroPar.descricao,
          registroPar.banco,
          registroPar.data_criacao,
          registroPar.taxa_transacao,
          registroPar.ativo,
          registroPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAgencia|insertAgencia] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateAgencia = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE agencia SET " +
          "numero_agencia = $2, " +
          "descricao = $3, " +
          "banco = $4, " +
          "data_criacao = $5, " +  
          "taxa_transacao = $6, " +
          "ativo = $7, " +  
          "removido = $8 " +          
          "WHERE agenciaid = $1",
        [
            registroPar.agenciaid  ,
            registroPar.numero_agencia,
            registroPar.descricao,
            registroPar.banco,
            registroPar.data_criacao,
            registroPar.taxa_transacao,
            registroPar.ativo,
            registroPar.removido,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAgencia|UpdateAgencia] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteAgencia = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE agencia SET " + "removido = true " + "WHERE agenciaid = $1",
      [registroPar.agenciaid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlAgencia|DeleteAgencia] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllAgencia,
  GetAgenciaByID,
  InsertAgencia,
  UpdateAgencia,
  DeleteAgencia,
};