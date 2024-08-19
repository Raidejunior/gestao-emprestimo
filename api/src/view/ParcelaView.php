<?php
namespace src\view;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\dto\ParcelaParaPagamento;

class ParcelaView {
    private HttpResponse $res;
    private HttpRequest $req;

    public function __construct(HttpResponse $res, HttpRequest $req) {
        $this->res = $res;
        $this->req = $req;
    }

    public function dadosParcela(): ParcelaParaPagamento {
        $dados = (array) $this->req->body();
        
        $parcelaParaPagamento = new ParcelaParaPagamento($dados);
        if(count($parcelaParaPagamento->atributosInvalidos->todos()) > 0) {
            $this->parametrosInvalidos($parcelaParaPagamento->atributosInvalidos->todos());
        }

        return $parcelaParaPagamento;
    } 

    public function parametrosInvalidos(array $parametros) {
        $this->res->status(400)->json(['Erros' => $parametros]);
        die();
    }
}
    