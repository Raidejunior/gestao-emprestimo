<?php

namespace src\service;

use src\dto\RelatorioParaExibicao;
use src\repository\DBConnection;
use src\repository\RelatorioRepository;
use src\repository\RelatorioRepositoryEmBDR;

class RelatorioService {
    
    private string $dataInicio;
    private string $dataTermino;
    private RelatorioRepository $relatorioRepository;

    public function __construct(string $dataInicio, string $dataTermino){
        $this->dataInicio = $dataInicio;
        $this->dataTermino = $dataTermino;
    }

    public function gerarRelatorio(): ?RelatorioParaExibicao {
        $pdo = DBConnection::conectar();
        $this->relatorioRepository = new RelatorioRepositoryEmBDR($pdo);
        $relatorioParaExibicao = new RelatorioParaExibicao();

        $empPeriodo = $this->relatorioRepository->emprestimosNoPeriodo($this->dataInicio, $this->dataTermino);
        if(! $empPeriodo || $empPeriodo < 1) {
            return null;
        }

        $dadosDosDiasNoPerido = $this->relatorioRepository->dadosDosDiasNoPeriodo($this->dataInicio, $this->dataTermino);
        if(! $dadosDosDiasNoPerido || $dadosDosDiasNoPerido < 1) {
            return null;
        }

        $dadosGeraisNoPeriodo = $this->relatorioRepository->dadosGeraisNoPeriodo($this->dataInicio, $this->dataTermino);
        if(! $dadosGeraisNoPeriodo) {
            return null;
        }

        $relatorioParaExibicao->setEmprestimosPeriodo($empPeriodo);
        $relatorioParaExibicao->setDadosDosDias($dadosDosDiasNoPerido);
        $relatorioParaExibicao->setDadosGerais($dadosGeraisNoPeriodo);

        return $relatorioParaExibicao;
    }
}