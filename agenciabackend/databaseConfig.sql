create table IF NOT EXISTS agencia (
    agenciaid bigserial constraint pk_agencia PRIMARY KEY,
    numero_agencia varchar(5) UNIQUE,
    descricao VARCHAR(60),
    banco varchar(40),
    data_criacao date,
    taxa_transacao numeric(1),
    ativo boolean,
    removido boolean DEFAULT false
);

insert into agencia values 
    (default, '001', 'Centro','Santander','20/08/2000',1.5, true),
    (default, '007', 'Norte','Banco do Brasil','04/09/1985',0.5, true),
    (default, '238', 'Dentro do shopping Zona Sul','Bradesco','16/03/1974',1.2, true),
    (default, '102', 'Ao lado do mercado Proença','Caixa Economica Federal','25/06/1988',0.8, false)
    ON CONFLICT DO NOTHING;

--Usuarios do sistema
create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    removido boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;
