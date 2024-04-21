<?php

namespace src\controller;

require_once 'vendor/autoload.php';

use src\model\Emprestimo;
use src\view\EmprestimoView;

class EmprestimoController{

    /**
     * Responsável por gerenciar a busca de todos os empréstimos no banco de dados e seu retorno.
     * 
     */
    function buscarTodosEmprestimos() {
        $emprestimoModel = new Emprestimo();
        $emprestimos = $emprestimoModel->buscarTodosEmprestimos();

        return $emprestimos;
    }

    /**
     * Responsável por gerenciar a inserção do empréstimo no banco de dados e seu retorno.
     * @param array $emprestimo
     * @return int - Vai retornar uma resposta HTTP.
     */
    function salvarEmprestimo($emprestimo){
        $emprestimoModel = new Emprestimo();
        $dadoRetorno = $emprestimoModel->salvarEmprestimo($emprestimo);
        $emprestimoView = new EmprestimoView();
        $retornoHTTP = $emprestimoView->retornaEmprestimoHTTP($dadoRetorno);
        return $retornoHTTP;
    }   
}