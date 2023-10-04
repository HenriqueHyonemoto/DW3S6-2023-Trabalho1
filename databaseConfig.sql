create table IF NOT EXISTS banco (
    bancoid bigserial constraint pk_banco PRIMARY KEY,
    numbanco varchar(50) UNIQUE,
    nome VARCHAR(60),
    date,
    numeric(,),
    ativo boolean,
    deleted boolean DEFAULT false
);

insert into banco values 
    (default, '1234', 'Santander', true),
    (default, '4321', 'Bradesco', true),
    (default, '1473', 'Caixa Economica Federal', true),
    (default, '9637', 'Banco do Brasil', false)
    ON CONFLICT DO NOTHING;


create table IF NOT EXISTS agencia (
    agenciaid bigserial constraint pk_agencia PRIMARY KEY,
    numagencia varchar(5) UNIQUE,
    descricao VARCHAR(60),
    data_criacao date,
    taxa_transacao numeric(3,3),
    ativo boolean,
    agenciad bigint constraint fk_agencia_banco REFERENCES banco,
    deleted boolean DEFAULT false
);

insert into agencia values 
    (default, '001', 'Centro', true,(SELECT agenciaid from banco where numbanco = '001')),
    (default, '007', 'Bacharelado em Direito', true),
    (default, '238', 'Licenciatura em Letras', true),
    (default, '102', 'Bacharelado em Administração', false)
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS cliente (
    clienteid bigserial constraint pk_cliente PRIMARY KEY,
    prontuario varchar(10) UNIQUE,
    nome varchar(50),
    endereco VARCHAR(60),
    renda numeric(8,2),
    datanascimento date,
    clienteid bigint constraint fk_cliente_agencia REFERENCES agencia,
    deleted boolean DEFAULT false
);

insert into cliente values 
    (default, 'pront1', 'José das Neves', 'Rua A, Votuporanga', 6891.60, '2000-01-31', 
        (SELECT clienteid from agencia where codigo = '001')),
    (default, 'pront2', 'Maria Silveira', 'Rua B, São José do Rio Preto', 7372.41, '2002-03-12', 
        (SELECT clienteid from agencia where codigo = '102'))
ON CONFLICT DO NOTHING;

--Usuarios do sistema
create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;
