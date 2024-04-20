<?php

namespace src\controller;

require_once 'vendor/autoload.php';

use src\repository\DBConnection;
use src\repository\EmprestimoRepository;
use src\view\EmprestimoView;

class EmprestimoController{
    /**
     * Responsável por gerenciar a inserção do empréstimo no banco de dados e seu retorno.
     * @param array $emprestimo
     * @return int - Vai retornar uma resposta HTTP.
     */
    function salvarEmprestimo($emprestimo){
        $db = new DBConnection();
        $pdo = $db->conectar();
        $emprestimoRepository = new EmprestimoRepository($pdo);
        $emprestimoView = new EmprestimoView();
        $dadoRetorno = $emprestimoRepository->salvarEmprestimo($emprestimo);
        $retornoHTTP = $emprestimoView->retornaEmprestimoHTTP($dadoRetorno);
        return $retornoHTTP;
    }   
}