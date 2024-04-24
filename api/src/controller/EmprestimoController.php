<?php

namespace src\controller;

require_once 'vendor/autoload.php';

use src\model\Cliente;
use src\model\Emprestimo;
use src\model\FormaPagamento;
use src\model\Parcela;
use src\view\EmprestimoView;

class EmprestimoController{

    private $req;
    private $res;
    private EmprestimoView $emprestimoView;

    public function __construct($req, $res){   
        $this->req = $req;
        $this->res = $res;
        $this->emprestimoView = new EmprestimoView($req, $res);
    }

    /**
     * Responsável por gerenciar a busca de todos os empréstimos no banco de dados e seu retorno.
     * @return void
     */
    function buscarTodosEmprestimos() {
        $emprestimoModel = new Emprestimo();
        $emprestimos = $emprestimoModel->buscarTodosEmprestimos();

        $this->emprestimoView->retornaTodosOsEmprestimos($emprestimos);
    }

    /**
     * Responsável por gerenciar a inserção do empréstimo no banco de dados e seu retorno.
     * @return int - Vai retornar uma resposta HTTP.
     */
    function salvarEmprestimo(){
        $dadosCliente = $this->emprestimoView->retornaDadosCliente();
        $dadosFormaPagamento = $this->emprestimoView->retornaDadosFormaPagamento();
        $dadosParcelas = $this->emprestimoView->retornaDadosParcelas();
        $dadosEmprestimo = $this->emprestimoView->retornaDadosEmprestimo();

        $cliente = new Cliente($dadosCliente['id'], $dadosCliente['nome'], $dadosCliente['cpf'], 
            $dadosCliente['dataNascimento']);
        $formaPagamento = new FormaPagamento($dadosFormaPagamento['id'], $dadosFormaPagamento['descricao'], $dadosFormaPagamento['meses'],
            $dadosFormaPagamento['juros']);

        $parcelas = [];
        foreach($dadosParcelas as $p) {
            $vencimento = explode('T', $p['vencimento'])[0]; // ajustando o formato da data para salvar no BD
            $parcela = new Parcela(0, $p['numero'], $vencimento, $p['valor']);
            array_push($parcelas, $parcela);
        }

        $emprestimo = new Emprestimo(0, $cliente, $dadosEmprestimo['valorSolicitado'], $dadosEmprestimo['valorPago'],
            $formaPagamento, '', $parcelas);
        
        $idEmprestimo = $emprestimo->salvarEmprestimo();

        if($idEmprestimo == -1) {
            $this->emprestimoView->retornaStatusHTTP(500);
        }

        $emprestimo->salvarParcelas($parcelas, $idEmprestimo);

        $this->emprestimoView->retornaStatusHTTP(201);
    }   
}