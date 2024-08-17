<?php

namespace src\dto;

class EmprestimoParaExibicao {
    public string $cliente;
    public float $valor;
    public string $dataEmprestimo;

    public function __construct($cliente, $valor, $dataEmprestimo) {
        $this->cliente = $cliente;
        $this->valor = $valor;
        $this->dataEmprestimo = $dataEmprestimo;
    }
}