<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once 'vendor/autoload.php';

use phputil\router\Router;
use function phputil\cors\cors;
use src\controller\ClienteController;
use src\controller\FormaPagamentoController;

$app = new Router();
$app->use( cors() );

$app->get('/cliente', function( $req, $res ) {
    $cpf = $req->param('cpf');
    $clienteController = new ClienteController();
    $cliente = $clienteController->buscaCPF($cpf);
    $res->send($cliente);
} );

$app->get('/forma_pagamento', function( $req, $res ) {
    $formaPagamentoController = new FormaPagamentoController();
    $lista = $formaPagamentoController->retornaListaFormaPagamento();
    $res->send($lista);
});

$app->listen();
?>