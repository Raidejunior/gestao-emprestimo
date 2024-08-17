<?php

namespace src\controller;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\dto\RelatorioParaExibicao;
use src\service\RelatorioService;
use src\view\RelatorioView;

class RelatorioController {
    private HttpResponse $res;
    private HttpRequest $req;
    private RelatorioView $relatorioView;
    
    public function __construct(HttpRequest $req, HttpResponse $res) {
        $this->res = $res;
        $this->req = $req;
        $this->relatorioView = new RelatorioView($this->req, $this->res);
    }

    public function gerarRelatorio() {
        $dadosParaRelatorio = $this->relatorioView->dadosParaRelatorio();
        $relatorioService = new RelatorioService($dadosParaRelatorio->dataInicio, $dadosParaRelatorio->dataTermino);
        $relatorio = $relatorioService->gerarRelatorio();

        if($relatorio instanceof RelatorioParaExibicao) {
            $this->relatorioView->retornarRelatorio($relatorio);
        } else {
            $this->relatorioView->periodoInvalido();
        }
    }

}