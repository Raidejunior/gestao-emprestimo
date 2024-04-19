<?php
namespace src\controller;

require_once 'vendor/autoload.php';

use src\repository\DBConnection;
use src\repository\FormaPagamentoRepository;
use src\view\FormaPagamentoView;

class FormaPagamentoController{

    /**
     * Responsável por gerenciar a busca pela lista de forma de pagamento.
     * @return string retorna uma string em formato json com as formas de pagamento.
     */
    public function retornaListaFormaPagamento(){
        $db = new DBConnection();
        $pdo = $db->conectar();
        $formaPagamentoRepository = new FormaPagamentoRepository($pdo);
        $lista = $formaPagamentoRepository->retornaListaFormaPagamento();
        $formaPagamentoView = new FormaPagamentoView();
        $listaEmJson = $formaPagamentoView->retornaArrayFormaPagamentoEmJson($lista);
        return $listaEmJson;
    }
}