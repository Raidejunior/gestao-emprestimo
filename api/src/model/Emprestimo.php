<?php
namespace src\model;

require_once "vendor/autoload.php";

use Exception;
use src\repository\DBConnection;
use src\repository\EmprestimoRepository;

class Emprestimo{
    public $id;
    public $cliente_id;
    public $valor;
    public $formaPagamentoId;
    public $dataEmprestimo;
    public $parcelas;

    function __construct($id = 0, $cliente_id = 0, $valor = 0, $formaPagamentoId = 0, $dataEmprestimo = '',
        $parcelas = []) {
        $this->id = $id;
        $this->cliente_id = $cliente_id;
        $this->valor = $valor;
        $this->formaPagamentoId = $formaPagamentoId;
        $this->dataEmprestimo = $dataEmprestimo;
        $this->parcelas = $parcelas;
    }


    /**
     * Responsável por chamar o repository para buscar todos os empréstimos.
     */
    function buscarTodosEmprestimos() {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $emprestimoRepository = new EmprestimoRepository($pdo);
        $emprestimos = $emprestimoRepository->buscarTodosEmprestimos();

        return $emprestimos;
    }

    /**
     * Responsável por chamar o repository para salvar o empréstimo.
     * @param array $emprestimo
     * @return int dado do id da linha inserida ou -1 para posterior avaliação e retorno HTTP correto.
     */
    function salvarEmprestimo($emprestimo){
        $erro = $this->validaValores($emprestimo);
        if($erro){
            throw new Exception( 'Dados de valor não permitido.', 400);
        }
        $db = new DBConnection();
        $pdo = $db->conectar();
        $emprestimoRepository = new EmprestimoRepository($pdo);
        $dadoRetorno = $emprestimoRepository->salvarEmprestimo($emprestimo);
        return $dadoRetorno;
    }

    /**
     * Valida o valor do empréstimo a ser feito
     */
    function validaValores($emprestimo){
        $valor = $emprestimo['valor'];
        $erro = 0;
        if($valor < 500 || $valor > 50000)
        {
            $erro = 1;
        }
        return $erro;
    }

}