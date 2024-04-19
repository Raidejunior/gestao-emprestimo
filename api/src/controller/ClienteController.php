<?php
namespace src\controller;

require_once 'vendor/autoload.php';

use src\view\ClienteView;
use src\repository\DBConnection;
use src\repository\ClienteRepository;

class ClienteController{

    /**
     * Responsável por receber um cpf e gerenciar a procura/formatação dele no sistema.
     * @param string $cpf
     * @return Json - Vai retornar um json com os dados do cliente.
     */
    public function buscaCPF($cpf) {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $cr = new ClienteRepository($pdo);
        $cliente = $cr->retornaClientePorCPF($cpf);
        $cv = new ClienteView();
        $clienteEmJson = $cv->retornaClienteEmJson($cliente);

        return $clienteEmJson;
    }
}