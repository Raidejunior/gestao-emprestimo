DROP DATABASE IF EXISTS acme;
CREATE DATABASE acme;
USE acme;

CREATE TABLE cliente (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    email VARCHAR(40),
    telefone VARCHAR(25),
    endereco VARCHAR(255),
    limite_credito DECIMAL(10,2),
    CONSTRAINT `pk__cliente` PRIMARY KEY( id )
)ENGINE=INNODB;

CREATE TABLE forma_pagamento (
    id INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    meses INT NOT NULL,
    juros DECIMAL(5,2) NOT NULL,
    CONSTRAINT `pk__forma_pagamento` PRIMARY KEY( id )
)ENGINE=INNODB;

CREATE TABLE emprestimo (
    id INT NOT NULL AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    forma_pagamento_id INT NOT NULL,
    data_emprestimo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk__cliente_id` FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    CONSTRAINT `fk__forma_pagamento_id` FOREIGN KEY (forma_pagamento_id) REFERENCES forma_pagamento(id),
    CONSTRAINT `pk__emprestimo` PRIMARY KEY( id )
)ENGINE=INNODB;

CREATE TABLE parcela (
	id INT NOT NULL AUTO_INCREMENT,
	numero INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    vencimento DATE NOT NULL,
    emprestimo_id INT NOT NULL,
    status ENUM("aberta", "paga") NOT NULL DEFAULT "aberta",
    data_pagamento DATETIME DEFAULT NULL,
    funcionario_pagamento_id INT DEFAULT NULL,
    CONSTRAINT `pk__parcela` PRIMARY KEY (id),
	CONSTRAINT `fk__emprestimo_id` FOREIGN KEY (emprestimo_id) REFERENCES emprestimo(id)
)ENGINE=INNODB;

CREATE TABLE funcionario (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    permissao ENUM("1", "2") NOT NULL DEFAULT "1",
    CONSTRAINT `pk__funcionario` PRIMARY KEY (id)
)ENGINE=INNODB;




INSERT INTO funcionario
(nome, login, email, permissao, senha) 
VALUES 
('Gerente XYZ', 'gerente', 'gerente1@gmail.com', '2', 'cdc0a4d7bd333c595f8ab148230e68b816d3df60b089834c1231b25d6c5215464b0c0341c68117fa2973ef2f50a67329'),
('Funcionário XYZ', 'funcionario', 'funcionario@gmail.com', '1', 'e1f5d8fdff0b244836c3bf95059ac6c234599cc0c4ba952d015001f57a395373538ff7e530fcfdf72c9d1cd0d3d7346b');
-- senha de ambos: 123456

INSERT INTO cliente
(nome, cpf, data_nascimento, email, telefone, endereco, limite_credito)
VALUES
('Cliente 1', '19195920757', '2008-07-26', 'cliente1@gmail.com', '2224567899', 'Rua ABC, bairro XYZ', 10000000),
('Cliente 2', '12345678910', '2008-02-28', 'cliente2@gmail.com', '2233333121', 'Rua XYZ, bairro ABC', 10000000);
-- clientes com limites grandes para fins de teste

INSERT INTO forma_pagamento
(descricao, meses, juros)
VALUES
('6 meses', 6, 10);

INSERT INTO forma_pagamento
(descricao, meses, juros)
VALUES
('12 meses', 12, 22);

INSERT INTO emprestimo(cliente_id, valor, forma_pagamento_id) VALUES
(1, 2223.00, 1);

INSERT INTO parcela(numero, valor, vencimento, emprestimo_id) VALUES
(1, 407.37, '2024-05-22', 1),
(2, 407.37, '2024-06-22', 1),
(3, 407.37, '2024-07-22', 1),
(4, 407.37, '2024-08-22', 1),
(5, 407.36, '2024-09-22', 1),
(6, 407.36, '2024-10-22', 1);