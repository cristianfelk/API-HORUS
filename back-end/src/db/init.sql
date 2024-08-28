create table uf (
    id serial primary key not null,
    nome varchar(250),
    sigla varchar(2) unique,
    ibge integer
);

create table municipio (
  id serial primary key not null,
  nome varchar(250) not null,
  ibge integer,
  uf varchar(2),
  foreign key (uf) references uf (sigla)
);

create table logradouro (
  id serial primary key not null,
  municipio_id integer,
  cep varchar(9),
  logradouro varchar(120),
  complemento varchar(120),
  bairro varchar(60),
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
  data_atualizacao timestamp,
  reset_token text,
  reset_token_expiration timestamp
);

create table fiscalizacao (
  id serial primary key not null,
  usuario_id integer not null,
  logradouro_fiscalizacao integer not null,
  data_fiscalizacao timestamp,
  status varchar(50),
  foreign key (usuario_id) references usuario (id),
  foreign key (logradouro_fiscalizacao) references logradouro (id)
);

create table fiscalizacao_dados (
  id serial primary key not null,
  id_fiscalizacao integer not null,
  dados jsonb,
  foreign key (id_fiscalizacao) references fiscalizacao (id)
);

create table status (
  id integer primary key not null,
  descricao varchar(50) not null
);

create table denuncia (
  id serial primary key not null,
  anonima boolean not null,
  id_municipio integer not null,
  id_logradouro integer not null,
  dados_denuncia jsonb,
  id_status integer,
  chave_denuncia text unique,
  foreign key (id_status) references status (id),
  foreign key (id_municipio) references municipio (id),
  foreign key (id_logradouro) references logradouro (id)
);

create table log (
  id serial primary key not null,
  acao varchar(20),
  tabela varchar(100),
  usuario_acao text,
  dados_antigos jsonb,
  dados_alterados jsonb,
  data_log timestamp
);

create or replace function atualizar_data_atualizacao()
returns trigger as $$
begin
    new.data_atualizacao := current_timestamp;
    return new;
end;
$$ language plpgsql;

create trigger trigger_atualizacao_usuario
before update on usuario
for each row
when (old.* is distinct from new.*)
execute function atualizar_data_atualizacao();

create or replace function log_usuario_alteracoes()
returns trigger as $$
begin
    insert into log (acao, tabela, usuario_acao, dados_antigos, dados_alterados, data_log)
    values (
        tg_op,  
        'usuario',  
        current_user,
        jsonb_build_object(
            'old', row_to_json(old)
        ),
        jsonb_build_object( 
            'new', row_to_json(new)
        ),
        current_timestamp  
    );
    return new;
end;
$$ language plpgsql;

create trigger trigger_log_usuario
after insert or update or delete on usuario
for each row
execute function log_usuario_alteracoes();

insert into uf (nome, sigla, ibge) 
values 
('Acre', 'AC', 12),
('Alagoas', 'AL', 27),
('Amapá', 'AP', 16),
('Amazonas', 'AM', 13),
('Bahia', 'BA', 29),
('Ceará', 'CE', 23),
('Distrito Federal', 'DF', 53),
('Espírito Santo', 'ES', 32),
('Goiás', 'GO', 52),
('Maranhão', 'MA', 21),
('Mato Grosso', 'MT', 51),
('Mato Grosso do Sul', 'MS', 50),
('Minas Gerais', 'MG', 31),
('Pará', 'PA', 15),
('Paraíba', 'PB', 25),
('Paraná', 'PR', 41),
('Pernambuco', 'PE', 26),
('Piauí', 'PI', 22),
('Rio de Janeiro', 'RJ', 33),
('Rio Grande do Norte', 'RN', 24),
('Rio Grande do Sul', 'RS', 43),
('Rondônia', 'RO', 11),
('Roraima', 'RR', 14),
('Santa Catarina', 'SC', 42),
('São Paulo', 'SP', 35),
('Sergipe', 'SE', 28),
('Tocantins', 'TO', 17);
