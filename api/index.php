<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once 'vendor/autoload.php';
require_once './src/service/ClienteService.php';

use phputil\router\Router;
use function phputil\cors\cors;

$app = new Router();
$app->use( cors() );
$app->get('/cliente', function( $req, $res ) {
    $cpf = $_GET['cpf'];
    $clienteService = new ClienteService();
    $cliente = $clienteService->buscaCPF($cpf);

    $res->json([
        "id" => $cliente->getId(),
        "nome" => $cliente->getNome(), 
        "cpf" => $cliente->getCPF(), 
        "dataNascimento" => $cliente->getDataNascimento()
    ]);
} );
$app->listen();
?>