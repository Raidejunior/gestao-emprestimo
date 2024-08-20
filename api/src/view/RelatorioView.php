<?php

namespace src\view;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\dto\PeriodoParaRelatorio;
use src\dto\RelatorioParaExibicao;

class RelatorioView {
    private HttpResponse $res;
    private HttpRequest $req;
    
    public function __construct(HttpRequest $req, HttpResponse $res) {
        $this->res = $res;
        $this->req = $req;
    }

    public function dadosParaRelatorio(): PeriodoParaRelatorio {
        $dataInicio = $this->req->param('dataInicio');
        $dataTermino = $this->req->param('dataTermino');
        
        $periodoParaRelatorio = new PeriodoParaRelatorio($dataInicio, $dataTermino);
        if(count($periodoParaRelatorio->atributosInvalidos->todos()) > 0) {
            $this->parametrosInvalidos($periodoParaRelatorio->atributosInvalidos->todos());
        }

        return $periodoParaRelatorio;
    } 

    public function retornarRelatorio(RelatorioParaExibicao $relatorio) {
        $this->res->status(200)->json($relatorio);
        die();
    }

    public function parametrosInvalidos(array $parametros) {
        $this->res->status(400)->json(['mensagem' => implode(', ', $parametros)]);
        die();
    }

    public function periodoInvalido() {
        $this->res->status(400)->json(['mensagem' => 'Não existem dados de empréstimos para serem exibidos no período solicitado']);
        die();
    }

    public function erroServidor() {
        $this->res->status(500)->json('Erro interno do servidor');
        die();
    }

}