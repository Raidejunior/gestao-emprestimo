<?php

namespace src\view;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\dto\FuncionarioParaCadastro;
use src\dto\FuncionarioParaExibicao;

class FuncionarioView {
    private HttpResponse $res;
    private HttpRequest $req;
    
    public function __construct(HttpRequest $req, HttpResponse $res) {
        $this->res = $res;
        $this->req = $req;
    }

    public function dadosParaCadastro(): ?FuncionarioParaCadastro {
        $dados = (array) $this->req->body();
        $funcionarioParaCadastro = new FuncionarioParaCadastro($dados);
        if(count($funcionarioParaCadastro->atributosInvalidos) > 0) {
            $this->parametrosInvalidos($funcionarioParaCadastro->atributosInvalidos);
        }

        return $funcionarioParaCadastro;
    }

    public function dadosParaLogin() {
        $dados = (array) $this->req->body();
        if(! isset($dados['login'], $dados['senha'])) {
            $this->res->status(400)->send('Login ou senha não enviados.');
            die();
        }

        return [
            'login' => $dados['login'],
            'senha' => $dados['senha']
        ];
    }

    public function retornaFuncionario(FuncionarioParaExibicao $funcionario, int $codigo) {
        $this->res->status($codigo)->json($funcionario);
    }

    public function parametrosInvalidos(array $parametros) {
        $this->res->status(400)->json(['Erros' => $parametros]);
        die();
    }

    public function autenticacaoInvalida() {
        $this->res->status(400)->send('Login ou senha inválidos');
        die();
    }

    public function acessoNegado() {
        $this->res->status(403)->send('Acesso negado');
        die();
    }

    public function erroServidor() {
        $this->res->status(500)->send('Erro interno do servidor');
        die();
    }


}

?>