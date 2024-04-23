<?php

use src\model\Cliente;
use src\model\Emprestimo;
use src\model\FormaPagamento;

describe('Chamadas de Empréstimo.', function() {

    beforeAll( function(){
        $this->emprestimoModel = new Emprestimo();
        $this->clienteModel = new Cliente();
        $this->formaPgModel = new FormaPagamento();
    });

    it('Deve retornar corretamente todos os emprestimos.', function() {
        $emprestimos = $this->emprestimoModel->buscarTodosEmprestimos();
        expect($emprestimos)->toBeAn('array');
    });

    it('Deve salvar empréstimo do cliente corretamente com o valor mínimo permitido de 500', function() {
        $this->clienteModel->id = 1;
        $this->formaPgModel->id = 1;
        $this->emprestimoModel->valorSolicitado = 500;
        $this->emprestimoModel->cliente = $this->clienteModel;
        $this->emprestimoModel->formaPagamento = $this->formaPgModel;

        $idEmprestimoSalvo = $this->emprestimoModel->salvarEmprestimo();
        expect($idEmprestimoSalvo)->not->toBe(-1);
    });

    it('Deve salvar empréstimo do cliente corretamente com o valor máximo permitido de 5000', function() {
        $this->emprestimoModel->valorSolicitado = 5000;
        
        $idEmprestimoSalvo = $this->emprestimoModel->salvarEmprestimo();
        expect($idEmprestimoSalvo)->not->toBe(-1);
    });

    it('Deve retornar erro quando tentar salvar empréstimo do cliente com valor acima do permitido.',function () {
        $this->emprestimoModel->valorSolicitado = 55500;

        $erro = $this->emprestimoModel->validaValores();
        expect($erro)->toBeTruthy();
    });

    it('Deve retornar erro quando tentar salvar empréstimo do cliente com valor abaixo do permitido.',function () {
        $this->emprestimoModel->valorSolicitado = 400;

        $erro = $this->emprestimoModel->validaValores();
        expect($erro)->toBeTruthy();
    });

});