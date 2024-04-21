<?php
namespace src\controller;

require_once 'vendor/autoload.php';

use src\model\FormaPagamento;
use src\view\FormaPagamentoView;

class FormaPagamentoController{

    /**
     * Responsável por gerenciar a busca pelo array de forma de pagamento.
     * @return string retorna uma string em formato json com as formas de pagamento.
     */
    public function retornaArrayFormaPagamento(){
        $formaPagamentoModel = new FormaPagamento();
        $arrayFormaPagamento = $formaPagamentoModel->retornaArrayFormaPagamento();
        $formaPagamentoView = new FormaPagamentoView();
        $listaEmJson = $formaPagamentoView->retornaArrayFormaPagamentoEmJson($arrayFormaPagamento);
        return $listaEmJson;
    }
}