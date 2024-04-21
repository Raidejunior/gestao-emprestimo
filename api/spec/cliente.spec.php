<?php
use src\model\Cliente;

describe('BuscaClientesPorCpf', function(){
    beforeAll( function() {
        $this->clienteModel = new Cliente();
    });

    it('Deve retornar um cliente quando o mesmo enviar seu cpf corretamente.', function(){
        $cpf = '19195920757';
        $nome = 'Cliente 1';
        $dataNascimento = '2008-07-26';

        $resultado = $this->clienteModel->buscaCpf($cpf);

        expect($resultado['cpf'])->toEqual($cpf);
        expect($resultado['nome'])->toEqual($nome);
        expect($resultado['data_nascimento'])->toEqual($dataNascimento);
    });

    it('Deve retornar valores null quando o mesmo enviar seu cpf incorretamente.', function(){
        $cpf = '29285820747';

        $resultado = $this->clienteModel->buscaCpf($cpf);
        
        expect($resultado)->toBeEmpty();
    });
});