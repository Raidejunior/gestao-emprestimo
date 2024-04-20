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

CREATE TABLE emprestimo (
    id INT NOT NULL AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    forma_pagamento_id INT NOT NULL,
    data_emprestimo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES formapagamento(id),
    CONSTRAINT `pk_emprestimo` PRIMARY KEY( id )
   )ENGINE=INNODB;