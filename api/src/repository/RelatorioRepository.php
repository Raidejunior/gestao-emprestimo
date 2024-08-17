<?php

namespace src\repository;

interface RelatorioRepository {
    public function emprestimosNoPeriodo(string $dataInicio, string $dataTermino): ?array;
    public function dadosDosDiasNoPeriodo(string $dataInicio, string $dataTermino): ?array;
    public function dadosGeraisNoPeriodo(string $dataInicio, string $dataTermino): ?array;
}