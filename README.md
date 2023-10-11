# Anotações do DW3S6-2023-Trabalho1
# Comandos inicialização back
```
node app.js
```
### Caso "Error: Cannot find module 'express'"
```
npm i
```
# Comandos inicialização front

### usuario e senha
```
qwe
```
### Linux
```
DEBUG=dw3frontnode:* npm start
```
### Windows
```
set DEBUG=dw3frontNode:*
```
```
npm start
```

Trabalho para 25/10/2023

# Front End
    • Usar template (SBADMIN) de ADM para o FRONT no repositório do professor.
    • Front end Não pode fazer acesso direto com o SGBD.
    • Cada API do back-end precisa de uma função no front end que usa a API.
    • Front end deve ter controle de sessão de usuário logado.
    • Interface de CRUD (GetAll, GetById, Insert, Update, Delete) em uma tabela do modulo financeiro em sistema ERP.

# Back End
    • Pode ser feito em qualquer linguagem de programação.
    • Proteger Rotas das APIs com JWT ou outro mecanismo de token.
    • Realizar CRUD (GetAll, GetById, Insert, Update, Delete) em uma tabela do modulo financeiro em sistema ERP.
      
# Tabelas – Todas devem ter pelo menos campos: ID, Removido, Tipo texto, Tipo data e Tipo Decimal

![image](https://github.com/HenriqueHyonemoto/DW3S6-2023-Trabalho1/assets/91375748/eb5d236a-086d-4325-92d4-ee83b89c4fea)

    • Agência(
    agenciaid bigserial,
    numagencia varchar(50) UNIQUE,
    banco varchar(40),
    descricao varchar(40),
    data_criacao date,
    taxa_transacao decimal,
    removido boolean,
     ativo boolean,
    )

 
    agenciaid =
    removido =
    numagencia = codigo
    banco =
    descricao =
    data_criacao =
    taxa_transacao =


      
