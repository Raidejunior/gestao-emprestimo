<?php

namespace src\service;

use src\dto\ParcelaParaPagamento;
use src\repository\DBConnection;
use src\repository\ParcelaRepository;
use src\repository\ParcelaRepositoryEmBDR;

class ParcelaService {
    private ParcelaRepository $parcelaRepository;

    public function pagarParcela(ParcelaParaPagamento $parcela): bool {
        $sessao = new SessaoService();
        $funcionarioId = $sessao->idFuncionario();
        if(! $funcionarioId) {
            return false;
        }
        $parcela->funcionarioId = $funcionarioId;

        $pdo = DBConnection::conectar();
        $this->parcelaRepository = new ParcelaRepositoryEmBDR($pdo);
        $confirmacao = $this->parcelaRepository->pagarParcela($parcela);

        return $confirmacao;
    }

    /**
    * Responsável por chamar o repository para buscar parcelas e retorná-las.
    * @param string $emprestimoId
    * @return ?array - array de parcelas relacionadas a um empréstimo específico ou null caso não ache nenhuma parcela.
    */
    function buscarTodasParcelasDeEmprestimoId(string $emprestimoId) {
        $pdo = DBConnection::conectar();
        $parcelaRepository = new ParcelaRepositoryEmBDR($pdo);
        $parcelas = $parcelaRepository->buscarTodasParcelasDeEmprestimoId($emprestimoId);

        return $parcelas;
    }
}