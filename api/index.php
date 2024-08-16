<?php
require_once 'vendor/autoload.php';

use phputil\router\Router;
use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use function phputil\cors\cors;
use Dotenv\Dotenv;

use src\controller\ClienteController;
use src\controller\EmprestimoController;
use src\controller\FormaPagamentoController;
use src\controller\FuncionarioController;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$app = new Router();
$app->use( cors() );

$app->post('/login', function( HttpRequest $req,  HttpResponse $res ) {
    $funcionarioController = new FuncionarioController($req, $res);
    $funcionarioController->autenticarFuncionario();
});


$app->post('/funcionarios', function( HttpRequest $req,  HttpResponse $res ) {
    $funcionarioController = new FuncionarioController($req, $res);
    $funcionarioController->cadastrarFuncionario();
});


$app->post('/clientes', function( HttpRequest $req,  HttpResponse $res ) {
    $clienteController = new ClienteController($req, $res);
    $clienteController->cadastrarCliente();
});

$app->get('/clientes', function( HttpRequest $req,  HttpResponse $res ) {
    $clienteController = new ClienteController($req, $res);
    $clienteController->buscaCPF();
});


$app->get('/forma_pagamento', function( HttpRequest $req,  HttpResponse $res ) {
    $formaPagamentoController = new FormaPagamentoController($req, $res);
    $formaPagamentoController->buscarFormasPagamento();
});

$app->get('/emprestimos', function( HttpRequest $req,  HttpResponse $res ) {
    $emprestimoController = new EmprestimoController($req, $res);
    $emprestimoController->buscarTodosEmprestimos();
});


$app->post('/emprestimos', function( HttpRequest $req,  HttpResponse $res ) {
    $emprestimoController = new EmprestimoController($req, $res);
    $emprestimoController->salvarEmprestimo();
});

$app->listen();
?>
