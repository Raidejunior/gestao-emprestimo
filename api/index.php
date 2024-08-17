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
use src\middleware\MiddlewareGerente;
use src\middleware\MiddlewareLogado;


$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$app = new Router();
$app->use( cors() );


$app->post('/login', function( HttpRequest $req,  HttpResponse $res ) {
    $funcionarioController = new FuncionarioController($req, $res);
    $funcionarioController->autenticarFuncionario();
});

$app->delete('/login', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {

});


$app->post('/funcionarios', new MiddlewareGerente(), function( HttpRequest $req,  HttpResponse $res ) {
    $funcionarioController = new FuncionarioController($req, $res);
    $funcionarioController->cadastrarFuncionario();
});


$app->post('/clientes', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $clienteController = new ClienteController($req, $res);
    $clienteController->cadastrarCliente();
});

$app->get('/clientes', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $clienteController = new ClienteController($req, $res);
    $clienteController->buscaCPF();
});


$app->get('/forma_pagamento', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $formaPagamentoController = new FormaPagamentoController($req, $res);
    $formaPagamentoController->buscarFormasPagamento();
});

$app->get('/emprestimos', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $emprestimoController = new EmprestimoController($req, $res);
    $emprestimoController->buscarTodosEmprestimos();
});


$app->post('/emprestimos', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $emprestimoController = new EmprestimoController($req, $res);
    $emprestimoController->salvarEmprestimo();
});

$app->listen();

?>
