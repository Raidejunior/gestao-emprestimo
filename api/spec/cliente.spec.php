<?php

use src\dto\ClienteParaCadastro;
use src\model\Cliente;

describe('Chamadas de Cliente.', function(){
    beforeAll( function() {
        $this->clienteModel = new Cliente();
        $this->clienteCadastro = new ClienteParaCadastro();
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

    it('Deve retornar atributo invalido para nome de cliente quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => '',  // Nome vazio
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => 5000.0
        ]);
        
        // Verifica se o atributo "nome" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo nome é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo nome é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar atributo invalido para data de nascimento de cliente quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => 5000.0
        ]);
        
        // Verifica se o atributo "dataNascimento" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo data de nascimento é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo data de nascimento é obrigatório ou foi enviado incorretamente');
        
    });
    
    it('Deve retornar atributo invalido para cpf de cliente quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => 5000.0
        ]);
        
        // Verifica se o atributo "cpf" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo cpf é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo cpf é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar atributo invalido para telefone de cliente quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => 5000.0
        ]);
        
        // Verifica se o atributo "telefone" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo telefone é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo telefone é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar atributo invalido para email quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => '',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => 5000.0
        ]);
        
        // Verifica se o atributo "email" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo email é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo email é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar atributo invalido para endereco de cliente quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => '',
            'senha' => 'senhaSegura',
            'limiteCredito' => 5000.0
        ]);
        
        // Verifica se o atributo "endereco" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo endereço é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo endereço é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar atributo invalido para senha de cliente quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => '',
            'limiteCredito' => 5000.0
        ]);
        
        // Verifica se o atributo "senha" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo senha é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo senha é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar atributo invalido para limiteCredito de cliente quando não informado.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => null
        ]);
        
        // Verifica se o atributo "limiteCredito" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo limite de crédito é obrigatório ou foi enviado incorretamente');
        
        $encontrado = $resultado->encontrado();
        
        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo limite de crédito é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar atributo invalido para limiteCredito de cliente quando não informado corretamente.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => 'teste'
        ]);
        
        // Verifica se o atributo "limiteCredito" está listado como inválido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo limite de crédito é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é verdadeiro
        expect($encontrado)->toBe(true);

        // Verifica a mensagem
        expect($resultado->mensagem())->toEqual('O atributo limite de crédito é obrigatório ou foi enviado incorretamente');
        
    });

    it('Deve retornar true para limiteCredito de cliente quando informado corretamente.', function(){
        $this->clienteCadastro = new ClienteParaCadastro([
            'nome' => 'Cliente 1',
            'dataNascimento' => '1990-01-01',
            'cpf' => '123.456.789-00',
            'telefone' => '1234567890',
            'email' => 'email@example.com',
            'endereco' => 'Rua Exemplo, 123',
            'senha' => 'senhaSegura',
            'limiteCredito' => 50000
        ]);
        
        // Verifica se o atributo "limiteCredito" está listado como válido
        $resultado = $this->clienteCadastro->atributosInvalidos->contem('O atributo limite de crédito é obrigatório ou foi enviado incorretamente');

        $encontrado = $resultado->encontrado();

        // Verifica se o resultado é falso, pois não foi encontrado erro nesse caso
        expect($encontrado)->toBe(false);
        
    });
});