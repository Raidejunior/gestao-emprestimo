<?php

namespace src\controller;

require_once 'vendor/autoload.php';

use src\model\EmprestimoModel;
use src\view\EmprestimoView;

class EmprestimoController{
    /**
     * Responsável por gerenciar a inserção do empréstimo no banco de dados e seu retorno.
     * @param array $emprestimo
     * @return int - Vai retornar uma resposta HTTP.
     */
    function salvarEmprestimo($emprestimo){
        $emprestimoModel = new EmprestimoModel();
        $dadoRetorno = $emprestimoModel->salvarEmprestimo($emprestimo);
        $emprestimoView = new EmprestimoView();
        $retornoHTTP = $emprestimoView->retornaEmprestimoHTTP($dadoRetorno);
        return $retornoHTTP;
    }   
}