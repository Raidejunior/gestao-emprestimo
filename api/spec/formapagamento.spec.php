<?php
use src\model\FormaPagamento;

describe('Chamadas de FormaPagamento', function() {
    beforeAll( function() {
        $this->formaPagamentoModel = new FormaPagamento();
    });

    it('Deve retornar corretamente uma forma de pagamento quando solicitado.', function() {
        $arrayFormaPagamento = $this->formaPagamentoModel->retornaArrayFormaPagamento();

        expect($arrayFormaPagamento)->toBeAn('array');
    });

});