<?php

namespace src\repository;

use PDO;

class FormaPagamentoRepository{

    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Responsável por fazer a busca no banco de dados das formas de pagamento e retornar uma lista delas.
     * @return array Vai retornar um array de FormaPagamento
     */
    public function retornaArrayFormaPagamento() {
        $ps = $this->pdo->prepare('SELECT * FROM forma_pagamento');
        $ps->execute();
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
        return $dados;
    }
}