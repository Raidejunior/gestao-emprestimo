<?php
require_once 'vendor/autoload.php';

use phputil\router\Router;

const API = "http://localhost:8080";

$app = new Router();
$app->get( API + '/cliente', function( $req, $res ) {
    $cpf = $_GET['cpf'];
    $clienteService = new ClienteService();
    $cliente = $clienteService->buscaCPF($cpf);
    $res->json( $cliente );
} );
$app->listen();
?>