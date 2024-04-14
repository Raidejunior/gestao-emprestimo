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
('Cliente 1', '191.959.207-57', '2008-07-26');