<?php

namespace src\controller;

use src\dto\ClienteParaExibicao;
use src\model\Cliente;
use src\model\Credenciais;
use src\model\Funcionario;
use src\service\ClienteService;
use src\service\SessaoService;
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
        $sessaoService = new SessaoService();
        $permissao = $sessaoService->verificaPermissaoFuncionario();
        if($permissao !== Funcionario::GERENTE && $permissao !== Funcionario::FUNCIONARIO) {
            return $this->clienteView->acessoNegado();
        }

        $dadosCliente = $this->clienteView->dadosParaCadastro();
        $clienteParaCadastro = new Cliente('', $dadosCliente->nome, $dadosCliente->cpf, $dadosCliente->dataNascimento, $dadosCliente->email, $dadosCliente->telefone,
            $dadosCliente->endereco, $dadosCliente->limiteDeCredito);
        $clienteService = new ClienteService($clienteParaCadastro);

        $clienteCadastrado = $clienteService->cadastrarCliente();
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
        $clienteModel = new Cliente();
        $cliente = $clienteModel->buscaCPF($cpf);
        
        $this->clienteView->retornaCliente($cliente, 200);
    }
}