<?php

require_once 'vendor/autoload.php';

use phputil\router\Router;
use function phputil\cors\cors;
use src\controller\ClienteController;
use src\controller\FormaPagamentoController;
use src\controller\EmprestimoController;

$app = new Router();
$app->use( cors() );

$app->get('/clientes', function( $req, $res ) {
    $clienteController = new ClienteController($req, $res);
    $clienteController->buscaCPF();
});

$app->get('/forma_pagamento', function( $req, $res ) {
    $formaPagamentoController = new FormaPagamentoController($req, $res);
    $formaPagamentoController->buscarFormasPagamento();
});

$app->get('/emprestimos', function( $req, $res ) {
    $emprestimoController = new EmprestimoController($req, $res);
    $emprestimos = $emprestimoController->buscarTodosEmprestimos();
});


$app->post('/emprestimos', function( $req, $res ) {
    $emprestimoController = new EmprestimoController($req, $res);
    $emprestimoController->salvarEmprestimo();
});

$app->listen();
?>