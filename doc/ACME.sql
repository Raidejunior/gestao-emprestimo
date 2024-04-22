CREATE DATABASE IF NOT EXISTS acme;
USE acme;

CREATE TABLE cliente (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    data_nascimento DATE NOT NULL,
    CONSTRAINT `pk__cliente` PRIMARY KEY( id )
)ENGINE=INNODB;

INSERT INTO cliente
(nome, cpf, data_nascimento)
VALUES
('Cliente 1', '19195920757', '2008-07-26');

CREATE TABLE forma_pagamento (
    id INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    meses INT NOT NULL,
    juros DECIMAL(5,2) NOT NULL,
    CONSTRAINT `pk__forma_pagamento` PRIMARY KEY( id )
)ENGINE=INNODB;

INSERT INTO forma_pagamento
(descricao, meses, juros)
VALUES
('6 meses', 6, 10);

INSERT INTO forma_pagamento
(descricao, meses, juros)
VALUES
('12 meses', 12, 22);

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
    CONSTRAINT `pk__parcela` PRIMARY KEY (id),
	CONSTRAINT `fk__emprestimo_id` FOREIGN KEY (emprestimo_id) REFERENCES emprestimo(id)
)ENGINE=INNODB;