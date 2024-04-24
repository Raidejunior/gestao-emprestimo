<?php
namespace src\controller;

require_once 'vendor/autoload.php';

use src\view\ClienteView;
use src\model\Cliente;

class ClienteController{

    private $req;
    private $res;
    private ClienteView $clienteView;

    public function __construct($req, $res) {
        $this->req = $req;
        $this->res = $res;
        $this->clienteView = new ClienteView($req, $res);
    }

    /**
     * Responsável por receber um cpf e gerenciar a procura/formatação dele no sistema.
     * @param string $cpf
     * Vai retornar um json com os dados do cliente.
     */
    public function buscaCPF() {
        $cpf = $this->clienteView->cpf();
        $clienteModel = new Cliente();
        $cliente = $clienteModel->buscaCPF($cpf);
        
        $this->clienteView->retornaClienteEmJson($cliente);
    }
}