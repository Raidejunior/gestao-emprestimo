<?php

namespace src\controller;

use src\model\FormaPagamento;
use src\view\FormaPagamentoView;

class FormaPagamentoController{

    private $req;
    private $res;
    private FormaPagamentoView $fpView;

    public function __construct($req, $res){   
        $this->req = $req;
        $this->res = $res;
        $this->fpView = new FormaPagamentoView($this->req, $this->res);
    }

    /**
     * Responsável por gerenciar a busca pelo array de forma de pagamento.
     * retorna um array de formas de pagamento para a FormaDePagamentoView
     */
    public function buscarFormasPagamento(){
        $formaPagamentoModel = new FormaPagamento();
        $arrayFormaPagamento = $formaPagamentoModel->retornaArrayFormaPagamento();
        
        $this->fpView->retornaArrayFormaPagamentoEmJson($arrayFormaPagamento);
    }
}