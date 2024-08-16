<?php

use src\dto\FuncionarioParaCadastro;

describe('Chamadas de Cliente.', function(){
    beforeAll( function() {
        $this->FuncionarioCadastro = new FuncionarioParaCadastro([]);
    });

    it('Deve retornar atributo invalido para login de funcionario quando não informado.', function(){
        $dados = [
            'login' => '',
            'email' => 'cliente@gmail.com',
            'senha' => 'senhaSegura123',
            'permissao' => '1'
        ];

        // Reutilizando a instância inicial e chamando o construtor novamente com novos dados
        $this->FuncionarioCadastro->chamarConstrutorParaTeste($dados);

        $atributoInvalido = $this->FuncionarioCadastro->atributosInvalidos->contem("O atributo login é obrigatório ou foi enviado incorretamente");

        $encontrado = $atributoInvalido->encontrado();

        // Verifica se o erro foi encontrado
        expect($encontrado)->toBeTruthy();

        // Verifica a mensagem
        expect($atributoInvalido->mensagem())->toEqual("O atributo login é obrigatório ou foi enviado incorretamente");
    });

    it('Deve retornar atributo invalido para email de funcionario quando não informado..', function(){
        $dados = [
            'login' => 'login123',
            'email' => '',
            'senha' => 'senhaSegura123',
            'permissao' => '1'
        ];

        // Reutilizando a instância inicial e chamando o construtor novamente com novos dados
        $this->FuncionarioCadastro->chamarConstrutorParaTeste($dados);

        $atributoInvalido = $this->FuncionarioCadastro->atributosInvalidos->contem("O atributo email é obrigatório ou foi enviado incorretamente");

        $encontrado = $atributoInvalido->encontrado();

        // Verifica se o erro foi encontrado
        expect($encontrado)->toBeTruthy();

        // Verifica a mensagem
        expect($atributoInvalido->mensagem())->toEqual("O atributo email é obrigatório ou foi enviado incorretamente");
    });

    it('Deve retornar atributo invalido para senha de funcionario quando não informado.', function(){
        $dados = [
            'login' => 'login123',
            'email' => 'cliente@gmail.com',
            'senha' => '',
            'permissao' => '1'
        ];

        // Reutilizando a instância inicial e chamando o construtor novamente com novos dados
        $this->FuncionarioCadastro->chamarConstrutorParaTeste($dados);

        $atributoInvalido = $this->FuncionarioCadastro->atributosInvalidos->contem("O atributo senha é obrigatório ou foi enviado incorretamente");

        $encontrado = $atributoInvalido->encontrado();

        // Verifica se o erro foi encontrado
        expect($encontrado)->toBeTruthy();

        // Verifica a mensagem
        expect($atributoInvalido->mensagem())->toEqual("O atributo senha é obrigatório ou foi enviado incorretamente");
    });

    it('Deve retornar atributo invalido para permissao de funcionario quando não informado.', function(){
        $dados = [
            'login' => 'login123',
            'email' => 'cliente@gmail.com',
            'senha' => 'senhaSegura123',
            'permissao' => ''
        ];

        // Reutilizando a instância inicial e chamando o construtor novamente com novos dados
        $this->FuncionarioCadastro->chamarConstrutorParaTeste($dados);

        $atributoInvalido = $this->FuncionarioCadastro->atributosInvalidos->contem("O atributo permissao é obrigatório ou foi enviado incorretamente");

        $encontrado = $atributoInvalido->encontrado();

        // Verifica se o erro foi encontrado
        expect($encontrado)->toBeTruthy();

        // Verifica a mensagem
        expect($atributoInvalido->mensagem())->toEqual("O atributo permissao é obrigatório ou foi enviado incorretamente");
    });
});
?>