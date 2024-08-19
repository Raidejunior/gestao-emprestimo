<?php

namespace src\service;

use src\dto\ParcelaParaPagamento;
use src\repository\DBConnection;
use src\repository\ParcelaRepository;

class ClienteService {
    private ParcelaRepository $parcelaRepository;

    public function pagarParcela(ParcelaParaPagamento $parcela): bool {
        $pdo = DBConnection::conectar();
        $this->parcelaRepository = new ParcelaRepository($pdo);
        $confirmacao = $this->parcelaRepository->pagarParcela($parcela);

        if($confirmacao) {
            return $true;
        }

        return false;
    }