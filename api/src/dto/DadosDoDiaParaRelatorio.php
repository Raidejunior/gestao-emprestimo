<?php

namespace src\dto;

class DadosDoDiaParaRelatorio {
    public string $dia;
    public int $qtdEmprestimosDia;
    public float $valorTotalDia;

    public function __construct($dia, $qtdEmprestimosDia, $valorTotalDia) {
        $this->dia = $dia;
        $this->qtdEmprestimosDia = $qtdEmprestimosDia;
        $this->valorTotalDia = $valorTotalDia;
    }
}