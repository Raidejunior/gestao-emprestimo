<?php
require_once 'vendor/autoload.php';

use phputil\router\Router;
use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use function phputil\cors\cors;
use Dotenv\Dotenv;
use phputil\cors\CorsOptions;
use src\controller\ClienteController;
use src\controller\EmprestimoController;
use src\controller\FormaPagamentoController;
use src\controller\FuncionarioController;
use src\controller\ParcelaController;
use src\controller\RelatorioController;
use src\middleware\MiddlewareGerente;
use src\middleware\MiddlewareLogado;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$app = new Router();

$options = (new CorsOptions())
    ->withOrigin('http://localhost:5173')
    ->withCredentials(true)
    ->withMethods('GET,POST,OPTIONS,PUT,DELETE')
    ->withAllowedHeaders('Content-Type, Authorization');

$app->use(cors($options));

$app->post('/login', function( HttpRequest $req,  HttpResponse $res ) {
    $funcionarioController = new FuncionarioController($req, $res);
    $funcionarioController->autenticarFuncionario();
});

$app->delete('/login', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $funcionarioController = new FuncionarioController($req, $res);
    $funcionarioController->logoutFuncionario();
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

$app->get('/parcelasDeIdEmprestimo', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $ParcelaController = new ParcelaController($req, $res);
    $ParcelaController->buscarTodasParcelasDeEmprestimoId();
});

$app->post('/parcelas', new MiddlewareLogado(), function( HttpRequest $req,  HttpResponse $res ) {
    $ParcelaController = new ParcelaController($req, $res);
    $ParcelaController->pagarParcela();
});


$app->get('/relatorios', new MiddlewareGerente(), function( HttpRequest $req,  HttpResponse $res ) {
    $relatorioController = new RelatorioController($req, $res);
    $relatorioController->gerarRelatorio();
});

$app->listen();

?>
