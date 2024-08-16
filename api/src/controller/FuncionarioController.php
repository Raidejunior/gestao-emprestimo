<?php

namespace src\controller;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\dto\FuncionarioParaExibicao;
use src\model\Credenciais;
use src\model\Funcionario;
use src\repository\FuncionarioRepositoryEmBDR;
use src\service\LoginService;
use src\service\SessaoService;
use src\service\FuncionarioService;
use src\view\FuncionarioView;

class FuncionarioController {
    private HttpResponse $res;
    private HttpRequest $req;
    private FuncionarioView $funcionarioView;
    
    public function __construct(HttpRequest $req, HttpResponse $res) {
        $this->res = $res;
        $this->req = $req;
        $this->funcionarioView = new FuncionarioView($this->req, $this->res);
    }

    public function cadastrarFuncionario() {
        $sessaoService = new SessaoService();
        $permissao = $sessaoService->verificaPermissaoFuncionario();
        if($permissao !== Funcionario::GERENTE) {
            return $this->funcionarioView->acessoNegado();
        }

        $dadosFuncionario = $this->funcionarioView->dadosParaCadastro();
        $credenciais = new Credenciais();
        $validacao = $credenciais->setCredenciais($dadosFuncionario->nome, $dadosFuncionario->senha, true);
        if(! $validacao) {
            return $this->funcionarioView->autenticacaoInvalida();
        }
        $funcionarioParaCadastro = new Funcionario('', $dadosFuncionario->nome, $dadosFuncionario->cpf, $dadosFuncionario->dataNascimento, $dadosFuncionario->telefone, $dadosFuncionario->email,
            $dadosFuncionario->endereco, $credenciais, $dadosFuncionario->permissao);

        $funcionarioService = new FuncionarioService($funcionarioParaCadastro);
        $funcionarioCadastrado = $funcionarioService->cadastrarFuncionario();

        if($funcionarioCadastrado instanceof FuncionarioParaExibicao) {
            $this->funcionarioView->retornaFuncionario($funcionarioCadastrado, 201);
        } else {
            $this->funcionarioView->erroServidor();
        }
    }

    public function autenticarFuncionario() {
        $dadosLogin = $this->funcionarioView->dadosParaLogin();
        $credenciais = new Credenciais();
        $validacao = $credenciais->setCredenciais($dadosLogin['login'], $dadosLogin['senha']);
        if(! $validacao) {
            return $this->funcionarioView->autenticacaoInvalida();
        }

        $loginService = new LoginService($credenciais);
        $funcionario = $loginService->autenticarFuncionario();

        if($funcionario instanceof FuncionarioParaExibicao) {
            $this->funcionarioView->retornaFuncionario($funcionario, 200);
        } else {
            $this->funcionarioView->autenticacaoInvalida();
        }
    }
}

?>