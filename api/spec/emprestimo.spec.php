<?php

use src\model\Emprestimo;

describe('Chamadas de Empréstimo.', function() {

    beforeAll( function(){
        $this->emprestimoModel = new Emprestimo();
    });

    it('Deve retornar corretamente todos os emprestimos.', function() {
        $emprestimos = $this->emprestimoModel->buscarTodosEmprestimos();
        expect($emprestimos)->toBeAn('array');
    });

    it('Deve salvar empréstimo do cliente corretamente com o valor mínimo permitido de 500', function() {
        $cliente_id = '1';
        $valor = 500;
        $forma_pagamento_id = '1';
        $emprestimo = [
            "cliente_id" => $cliente_id, 
            "valor" => $valor, 
            "forma_pagamento_id" => $forma_pagamento_id
        ];
        $emprestimos = $this->emprestimoModel->salvarEmprestimo($emprestimo);
        expect($emprestimos)->toBeGreaterThan(0);
    });

    it('Deve salvar empréstimo do cliente corretamente com o valor máximo permitido de 5000', function() {
        $cliente_id = '1';
        $valor = 500;
        $forma_pagamento_id = '1';
        $emprestimo = [
            "cliente_id" => $cliente_id, 
            "valor" => $valor, 
            "forma_pagamento_id" => $forma_pagamento_id
        ];
        $emprestimos = $this->emprestimoModel->salvarEmprestimo($emprestimo);
        expect($emprestimos)->toBeGreaterThan(0);
    });

    it('Deve retornar erro quando tentar salvar empréstimo do cliente com valor acima do permitido.',function () {
        $cliente_id = '1';
        $valor = 55000;
        $forma_pagamento_id = '1';
        $emprestimo = [
            "cliente_id" => $cliente_id, 
            "valor" => $valor, 
            "forma_pagamento_id" => $forma_pagamento_id
        ];
        $emprestimos = $this->emprestimoModel->validaValores($emprestimo);
        expect($emprestimos)->toBeTruthy();
    });

    it('Deve retornar erro quando tentar salvar empréstimo do cliente com valor abaixo do permitido.',function () {
        $cliente_id = '1';
        $valor = 400;
        $forma_pagamento_id = '1';
        $emprestimo = [
            "cliente_id" => $cliente_id, 
            "valor" => $valor, 
            "forma_pagamento_id" => $forma_pagamento_id
        ];
        $emprestimos = $this->emprestimoModel->validaValores($emprestimo);
        expect($emprestimos)->toBeTruthy();
    });

});