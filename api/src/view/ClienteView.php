<?php

namespace src\view;

use src\dto\ClienteParaCadastro;
use src\dto\ClienteParaExibicao;

class ClienteView{

    private $req;
    private $res;

    public function __construct($req, $res){
        $this->req = $req;
        $this->res = $res;
    }

    public function dadosParaCadastro(): ?ClienteParaCadastro {
        $dados = (array) $this->req->body();
        $clienteParaCadastro = new ClienteParaCadastro($dados);
        if(count($clienteParaCadastro->atributosInvalidos->todos()) > 0) {
            $this->parametrosInvalidos($clienteParaCadastro->atributosInvalidos->todos());
        }

        return $clienteParaCadastro;
    }

    /**
     * Responsável por retornar o CPF da requisição, devolve uma resposta com código 400 caso não haja um parâmetro CPF
     * @return string
     */
    public function cpf(): string {
        $cpf = $this->req->param('cpf');
        if(!$cpf) {
            $this->res->status(400)->send('Parâmetros inválidos');
        }

        return $cpf;
    }

    /**
     * Responsável por receber um cliente e retorná-lo em json.
     * @param Cliente parâmetro do tipo Cliente.
     */
    function retornaCliente($cliente, int $codigo){
        if(!$cliente) {
            $this->res->status(404)->send('Nenhum cliente encontrado');
            return;
        }

        $this->res->status($codigo)->json($cliente); 
    }

    public function parametrosInvalidos(array $parametros) {
        $this->res->status(400)->json(['mensagem' => $parametros]);
        die();
    }

    public function autenticacaoInvalida() {
        $this->res->status(400)->send(['mensagem' => 'Login ou senha inválidos']);
        die();
    }

    public function acessoNegado() {
        $this->res->status(403)->send(['mensagem' => 'Acesso negado']);
        die();
    }

    public function violacaoUnicidade() {
        $this->res->status(409)->send(['mensagem' => 'CPF já cadastrado no sistema']);
        die();
    }

    public function erroServidor() {
        $this->res->status(500)->send(['mensagem' => 'Erro interno do servidor']);
        die();
    }
}