const axios = require("axios");

//@ Abre o formulário de manutenção de Agencia
const getAllAgencia = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllAgencia", {});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("Agencia/view_manutencao", {
        title: "Manutenção de Agencia",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlAgencia.js|getAllAgencia] Try Catch:Erro de requisição");
    }
  })();

//@ Abre formulário de cadastro de Agencia
const openAgenciaInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("Agencia/view_cadAgencia", {
          title: "Cadastro de Agencia",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlAlunos.js|insertAlunos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.cursoid == "") {
    regFormPar.cursoid = 0;
  } else {
    regFormPar.cursoid = parseInt(regFormPar.cursoid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.deleted = regFormPar.deleted === "true"; //converte para true ou false um check componet

  return regFormPar;
}

//@ Abre formulário de cadastro de Agencia
const openAgenciaUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("Agencia/view_cadAgencia", {
          title: "Cadastro de Agencia",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlAlunos.js|insertAlunos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();


//@ Recupera os dados dos Agencia
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;    
    parseInt(idBusca);
    console.log("[ctlAgencia.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/GetCursoByID",
        {
          cursoid: idBusca,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.status == "ok") {
        res.json({ status: "ok", registro: resp.data.registro[0] });
      }
    } catch (error) { 
      console.log(
        "[ctlAgencia.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
    
  })();

//@ Realiza inserção de Agencia
const insertAgencia = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.cursoid = 0;
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/InsertAgencia",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Agencia inserido com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao inserir agencia!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlAlunos.js|insertAlunos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

 
  
//@ Realiza atualização de Agencia
///@ console.log("[ctlAlunos.js|updateAgencia] Valor regPost: ", regPost);
const updateAgencia = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/UpdateAgencia",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Agencia atualizado com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar agencia!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlAlunos.js|updateAgencia] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de Agencia
//@ "[ctlAlunos.js|deleteAgencia] Try Catch: Erro não identificado", erro);
const deleteAgencia = (req, res) =>
(async () => {
  token = req.session.token;
  try {
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.cursoid = parseInt(regPost.cursoid);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteAgencia",
        {
          cursoid: regPost.cursoid,
        },        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Agencia removido com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao remover agencia!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlAlunos.js|deleteAgencia] Try Catch: Erro não identificado", erro);
  }
})();
module.exports = {
  getAllAgencia,
  openAgenciaInsert,
  openAgenciaUpdate,
  getDados,
  insertAgencia,
  updateAgencia,
  deleteAgencia,
};