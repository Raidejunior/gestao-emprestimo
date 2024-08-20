<?php

namespace src\dto;

class EmprestimoParaExibicao {
    public int $indice;
    public string $cliente;
    public float $valor;
    public string $dataEmprestimo;

    public function __construct($cliente, $valor, $dataEmprestimo, $indice) {
        $this->cliente = $cliente;
        $this->valor = $valor;
        $this->dataEmprestimo = $dataEmprestimo;
        $this->indice = $indice;
    }
}