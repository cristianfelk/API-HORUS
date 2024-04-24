create table usuario (
  id serial primary key not null,
  nome varchar(100) not null,
  login varchar(100) unique not null,
  senha text not null,
  email varchar(250) unique not null,
  data_cadastro date
);

create table fiscalizacao (
  id serial primary key not null,
  usuario_id integer not null,
  data_fiscalizacao timestamp,
  bairro_fiscalizacao integer,
  foreign key (usuario_id) references usuario (id),
  foreign key (bairro_fiscalizacao) references bairro (id)
);

create table fiscalizacao_dados (
  id serial primary key not null,
  id_fiscalizacao integer not null,
  dados json,
  foreign key (id_fiscalizacao) references fiscalizacao (id)
);

create table denuncia (
  id integer primary key not null,
  anonima boolean not null,
  dados_denuncia json,
  chave_denuncia text unique
);

create table bairro (
  id integer primary key not null,
  descricao varchar(120) not null,
  municipio_id integer,
  foreign key (municipio_id) references municipio (id)

);

create table municipio (
  id integer primary key not null,
  nome varchar(250) not null,
  cep varchar(10)
);

create table log (
  id integer primary key not null,
  acao varchar(20),
  tabela varchar(100),
  usuario_acao integer,
  dados_alterados text,
  foreign key (usuario_acao) references usuario (id)
);