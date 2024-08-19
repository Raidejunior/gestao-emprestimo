<?php

namespace src\controller;

use src\dto\ClienteParaExibicao;
use src\model\Cliente;
use src\service\ClienteService;
use src\view\ClienteView;

class ClienteController{

    private $req;
    private $res;
    private ClienteView $clienteView;

    public function __construct($req, $res) {
        $this->req = $req;
        $this->res = $res;
        $this->clienteView = new ClienteView($req, $res);
    }


    public function cadastrarCliente() {
        $clienteParaCadastro = $this->clienteView->dadosParaCadastro();
        $clienteService = new ClienteService();

        $clienteCadastrado = $clienteService->cadastrarCliente($clienteParaCadastro);
        if($clienteCadastrado instanceof ClienteParaExibicao) {
            $this->clienteView->retornaCliente($clienteCadastrado, 201);
        } else {
            $this->clienteView->erroServidor();
        }

    }

    /**
     * Responsável por receber um cpf e gerenciar a procura/formatação dele no sistema.
     * @param string $cpf
     * Vai retornar um json com os dados do cliente.
     */
    public function buscaCPF() {
        $cpf = $this->clienteView->cpf();
        $clienteService = new ClienteService();
        $cliente = $clienteService->buscaCPF($cpf);
        
        $this->clienteView->retornaCliente($cliente, 200);
    }
}