create table municipio (
  id integer primary key not null,
  nome varchar(250) not null,
  cep varchar(10),
  uf varchar(2)
);

create table uf (
    id integer primary key not null,
    descricao varchar(250),
    sigla_uf varchar(2)
);

create table bairro (
  id integer primary key not null,
  descricao varchar(120) not null,
  municipio_id integer,
  foreign key (municipio_id) references municipio (id)
);

create table usuario (
  id serial primary key not null,
  nome varchar(100) not null,
  email varchar(250) unique not null,
  login varchar(100) unique not null,
  senha text not null,
  salt text not null,
  status varchar(50),
  data_cadastro date,
  data_atualizacao timestamp
);

create table fiscalizacao (
  id serial primary key not null,
  usuario_id integer not null,
  bairro_fiscalizacao integer not null,
  data_fiscalizacao timestamp,
  status varchar(50),
  foreign key (usuario_id) references usuario (id),
  foreign key (bairro_fiscalizacao) references bairro (id)
);

create table fiscalizacao_dados (
  id serial primary key not null,
  id_fiscalizacao integer not null,
  dados jsonb,
  foreign key (id_fiscalizacao) references fiscalizacao (id)
);

create table denuncia (
  id serial primary key not null,
  anonima boolean not null,
  dados_denuncia jsonb,
  status varchar(50),
  chave_denuncia text unique
);

create table log (
  id serial primary key not null,
  acao varchar(20),
  tabela varchar(100),
  usuario_acao text,
  dados_alterados jsonb,
  data_log timestamp
);

