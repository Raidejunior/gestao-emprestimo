<?php

use src\model\Credenciais;


describe('Chamadas de credenciais', function(){

    it('Deve falso para uma senha vazia', function() {
        $credenciais = new Credenciais();
        $resultado = $credenciais->setCredenciais('login', '');
        expect($resultado)->toBe(false);
    });

    it('Deve falso para uma senha menor que o tamanho permitido', function() {
        $credenciais = new Credenciais();
        $resultado = $credenciais->setCredenciais('login', '12345');
        expect($resultado)->toBe(false);
    });

    it('Deve falso para um login vazio', function() {
        $credenciais = new Credenciais();
        $resultado = $credenciais->setCredenciais('', '1234567');
        expect($resultado)->toBe(false);
    });

    it('Deve verdadeiro para um login preenchido e uma senha válida', function() {
        $credenciais = new Credenciais();
        $resultado = $credenciais->setCredenciais('login', '1234567');
        expect($resultado)->toBe(true);
    });


});