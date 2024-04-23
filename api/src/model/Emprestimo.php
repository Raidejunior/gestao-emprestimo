<?php
namespace src\model;

require_once "vendor/autoload.php";

use Exception;
use src\repository\DBConnection;
use src\repository\EmprestimoRepository;
use src\repository\ParcelaRepository;

class Emprestimo{
    public $id;
    public $cliente;
    public $valorSolicitado;
    public $valorPago;
    public $formaPagamento;
    public $dataEmprestimo;
    public $parcelas;

    function __construct($id = 0, $cliente = null, $valorSolicitado = 0, $valorPago = 0, $formaPagamento = null, 
        $dataEmprestimo = '', $parcelas = []) {
        $this->id = $id;
        $this->cliente = $cliente;
        $this->valorSolicitado = $valorSolicitado;
        $this->valorPago = $valorPago;
        $this->formaPagamento = $formaPagamento;
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
     * @param Em $emprestimo
     * @return int dado do id da linha inserida ou -1 para posterior avaliação e retorno HTTP correto.
     */
    function salvarEmprestimo(){
        $erro = $this->validaValores();
        if($erro){
            throw new Exception( 'Dados de valor não permitido.', 400);
        }
        $db = new DBConnection();
        $pdo = $db->conectar();
        $emprestimoRepository = new EmprestimoRepository($pdo);

        $idEmprestimo = $emprestimoRepository->salvarEmprestimo($this);

        return $idEmprestimo;
    }

    function salvarParcelas($parcelas, $idEmprestimo) {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $parcelaRepository = new ParcelaRepository($pdo);
        foreach($parcelas as $p){
            $parcelaRepository->salvarParcelas($p, $idEmprestimo);
        }
    }

    /**
     * Valida o valor do empréstimo a ser feito
     */
    function validaValores(){
        $valor = $this->valorSolicitado;
        $erro = 0;
        if($valor < 500 || $valor > 50000)
        {
            $erro = 1;
        }
        return $erro;
    }

}