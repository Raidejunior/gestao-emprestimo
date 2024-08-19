<?php
namespace src\controller;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\view\EmprestimoView;
use src\view\ParcelaView;

class ParcelaController{

    private HttpRequest $req;
    private HttpResponse $res;
    private ParcelaView $parcelaView;

    public function __construct(HttpRequest $req, HttpResponse $res) {
        $this->res = $res;
        $this->req = $req;
        $this->parcelaView = new ParcelaView($this->res, $this->req);
    }

    public function pagarParcela() {
        $dadosParcela = $this->parcelaView->dadosParcela();
    }

}