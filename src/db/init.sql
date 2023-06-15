CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  senha VARCHAR(100),
  data_cadastro DATE,
  reputacao INTEGER
);

CREATE TABLE categoria (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  descricao TEXT,
  data_criacao DATE,
  quantidade_topicos INTEGER
);

CREATE TABLE topico (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200),
  conteudo TEXT,
  data_criacao DATE,
  usuario_id INTEGER,
  categoria_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario (id),
  FOREIGN KEY (categoria_id) REFERENCES categoria (id)
);

CREATE TABLE resposta (
  id SERIAL PRIMARY KEY,
  conteudo TEXT,
  data_criacao DATE,
  usuario_id INTEGER,
  topico_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario (id),
  FOREIGN KEY (topico_id) REFERENCES topico (id)
);

CREATE TABLE voto_resposta (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER,
  resposta_id INTEGER,
  tipo_voto INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuario (id),
  FOREIGN KEY (resposta_id) REFERENCES resposta (id)
);