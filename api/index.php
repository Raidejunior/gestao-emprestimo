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
use src\controller\EmprestimoController;

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
    $lista = $formaPagamentoController->retornaArrayFormaPagamento();
    $res->send($lista);
});

$app->post('/salvar_emprestimo', function( $req, $res ) {
    $cliente_id = $req->param('cliente_id');
    $valor = $req->param('valor');
    $forma_pagamento_id = $req->param('forma_pagamento_id');
    $emprestimo = [
        "cliente_id" => $cliente_id, 
        "valor" => $valor, 
        "forma_pagamento_id" => $forma_pagamento_id
    ];
    $emprestimoController = new EmprestimoController();
    $retorno = $emprestimoController->salvarEmprestimo($emprestimo);
    $res->send($retorno);
});

$app->listen();
?>