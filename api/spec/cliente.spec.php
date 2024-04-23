<?php
use src\model\Cliente;

describe('Chamadas de Cliente.', function(){
    beforeAll( function() {
        $this->clienteModel = new Cliente();
    });

    it('Deve retornar um Objeto cliente quando o mesmo enviar seu cpf corretamente.', function(){
        $cpf = '19195920757';
        $nome = 'Cliente 1';
        $dataNascimento = '2008-07-26';

        $cliente = $this->clienteModel->buscaCpf($cpf);

        expect($cliente->cpf)->toEqual($cpf);
        expect($cliente->nome)->toEqual($nome);
        expect($cliente->dataNascimento)->toEqual($dataNascimento);
    });

    it('Deve retornar valores null quando o mesmo enviar seu cpf incorretamente.', function(){
        $cpf = '29285820747';

        $resultado = $this->clienteModel->buscaCpf($cpf);
        
        expect($resultado)->toBeEmpty();
    });
});