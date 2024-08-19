<?php

namespace src\service;

use src\dto\ParcelaParaPagamento;
use src\repository\DBConnection;
use src\repository\ParcelaRepository;
use src\repository\ParcelaRepositoryEmBDR;

class ParcelaService {
    private ParcelaRepository $parcelaRepository;

    public function pagarParcela(ParcelaParaPagamento $parcela): bool {
        $pdo = DBConnection::conectar();
        $this->parcelaRepository = new ParcelaRepository($pdo);
        $confirmacao = $this->parcelaRepository->pagarParcela($parcela);

        if($confirmacao) {
            return true;
        }

        return false;
    }

    /**
    * Responsável por chamar o repository para buscar parcelas e retorná-las.
    * @param string $emprestimoId
    * @return array - array de parcelas relacionadas a um empréstimo específico.
    */
    function buscarTodasParcelasDeEmprestimoId(string $emprestimoId) {
        $pdo = DBConnection::conectar();
        $parcelaRepository = new ParcelaRepositoryEmBDR($pdo);
        $parcelas = $parcelaRepository->buscarTodasParcelasDeEmprestimoId($emprestimoId);

        return $parcelas;
    }
}