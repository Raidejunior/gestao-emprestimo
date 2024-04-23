<?php
namespace src\controller;

require_once 'vendor/autoload.php';

use src\model\FormaPagamento;
use src\view\FormaPagamentoView;

class FormaPagamentoController{

    private $req;
    private $res;
    private FormaPagamentoView $fpView;

    public function __construct($req, $res){   
        $this->req = $req;
        $this->res = $res;
        $this->fpView = new FormaPagamentoView($req, $res);
    }

    /**
     * Responsável por gerenciar a busca pelo array de forma de pagamento.
     * @return string retorna uma string em formato json com as formas de pagamento.
     */
    public function buscarFormasPagamento(){
        $formaPagamentoModel = new FormaPagamento();
        $arrayFormaPagamento = $formaPagamentoModel->retornaArrayFormaPagamento();
        
        $this->fpView->retornaArrayFormaPagamentoEmJson($arrayFormaPagamento);
    }
}