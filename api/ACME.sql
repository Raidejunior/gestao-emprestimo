CREATE DATABASE acme;

CREATE TABLE cliente (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    dataNascimento DATE NOT NULL,
    CONSTRAINT `pk_cliente` PRIMARY KEY( id )
   )ENGINE=INNODB;

INSERT INTO cliente
(nome, cpf, dataNascimento)
VALUES
('Cliente 1', '19195920757', '2008-07-26');

CREATE TABLE formapagamento (
    id INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    meses INT NOT NULL,
    juros DECIMAL(5,2) NOT NULL,
    CONSTRAINT `pk_formapagamento` PRIMARY KEY( id )
   )ENGINE=INNODB;

INSERT INTO formapagamento
(descricao, meses, juros)
VALUES
('6 meses', 6, 10);

INSERT INTO formapagamento
(descricao, meses, juros)
VALUES
('12 meses', 12, 22);