create table IF NOT EXISTS agencia (
    agenciaid bigserial constraint pk_agencia PRIMARY KEY,
    codigo varchar(50) UNIQUE,
    descricao VARCHAR(60),
    ativo boolean,
    deleted boolean DEFAULT false
);

insert into agencia values 
    (default, 'BSI', 'Bacharelado em Sistemas de Informação', true),
    (default, 'DIREITO', 'Bacharelado em Direito', true),
    (default, 'LETRAS', 'Licenciatura em Letras', true),
    (default, 'ADM', 'Bacharelado em Administração', false)
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS cliente (
    clienteid bigserial constraint pk_cliente PRIMARY KEY,
    prontuario varchar(10) UNIQUE,
    nome varchar(50),
    endereco VARCHAR(60),
    rendafamiliar numeric(8,2),
    datanascimento date,
    cursoid bigint constraint fk_cliente_agencia REFERENCES cursos,
    deleted boolean DEFAULT false
);

insert into cliente values 
    (default, 'pront1', 'José das Neves', 'Rua A, Votuporanga', 6891.60, '2000-01-31', 
        (SELECT cursoid from CURSOS where codigo = 'BSI')),
    (default, 'pront2', 'Maria Silveira', 'Rua B, São José do Rio Preto', 7372.41, '2002-03-12', 
        (SELECT cursoid from CURSOS where codigo = 'DIREITO'))
ON CONFLICT DO NOTHING;

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
