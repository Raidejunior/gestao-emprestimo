<?php

namespace src\repository;

use src\dto\ParcelaParaPagamento;
use src\model\Parcela;

interface ParcelaRepository {
    function salvarParcelas(Parcela $parcela, $idEmprestimo): ?bool;
    function pagarParcela(ParcelaParaPagamento $parcela): bool;
    function buscarTodasParcelasDeEmprestimoId($idEmprestimo);
}