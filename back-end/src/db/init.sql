create table uf (
    id serial primary key not null,
    nome varchar(250),
    sigla varchar(2) unique,
    ibge integer
);

create table monitoramento (
  id serial primary key not null,
  casos_confirmados integer,
  casos_mortes integer,
  casos_monitorados integer,
  casos_ativos integer
);

insert into monitoramento (casos_confirmados, casos_mortes, casos_monitorados, casos_ativos) 
values (0, 0, 0, 0);

create table municipio (
  id integer primary key not null,
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
  quarteirao varchar(25),
  sequencia varchar(25),
  logradouro_fiscalizacao varchar(100),
  numero varchar(10),
  complemento varchar(100),
  tipo_imovel varchar(1),
  hora_entrada timestamp,
  visita char(1),
  pendencia varchar(20),
  status integer,
  usuario_id integer,
  a1 varchar(100),
  a2 varchar(100),
  b varchar(100),
  c varchar(100),
  d1 varchar(100),
  d2 varchar(100),
  e varchar(100),
  eliminado varchar(100),
  inicial varchar(100),
  final varchar(100),
  qtd_tubitos varchar(100),
  im_trat varchar(100),
  tipo_focal varchar(100),
  qtd_grama varchar(100),
  qtd_tratado varchar(100),
  tipo_perifocal varchar(100),
  qtd_gramas varchar(100),
  foreign key (usuario_id) references usuario (id)
);

create table denuncia (
  id serial primary key not null,
  anonima boolean not null,
  email_denunciante text,
  nome_denunciante text,
  telefone_denunciante text,
  id_municipio integer not null,
  id_logradouro text not null,
  descricao_denuncia text,
  id_status integer,
  chave_denuncia text unique,
  foreign key (id_municipio) references municipio (id)
);

alter table denuncia
add column latitude float8,
add column longitude float8;


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
