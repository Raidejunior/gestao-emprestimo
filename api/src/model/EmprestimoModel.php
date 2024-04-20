<?php
namespace src\model;

require_once "vendor/autoload.php";

use Exception;
use src\repository\DBConnection;
use src\repository\EmprestimoRepository;

class EmprestimoModel{

    /**
     * Responsável por chamar a repository para salvar o empréstimo.
     * @param array $emprestimo
     * @return int dado do id da linha inserida ou -1 para posterior avaliação e retorno HTTP correto.
     */
    function salvarEmprestimo($emprestimo){
        $this->validaValores($emprestimo);
        $db = new DBConnection();
        $pdo = $db->conectar();
        $emprestimoRepository = new EmprestimoRepository($pdo);
        $dadoRetorno = $emprestimoRepository->salvarEmprestimo($emprestimo);
        return $dadoRetorno;
    }

    function validaValores($emprestimo){
        $valor = $emprestimo['valor'];
        if($valor < 500 && $valor > 50.000)
        {
            throw new Exception( 'Dados de valor não permitido.', 400);
        }
    }

}