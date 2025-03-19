<?php

namespace src\controller;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\dto\FuncionarioParaExibicao;
use src\model\Credenciais;
use src\model\Funcionario;
use src\service\LoginService;
use src\service\FuncionarioService;
use src\service\SessaoService;
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
        $dadosFuncionario = $this->funcionarioView->dadosParaCadastro();
        $credenciais = new Credenciais();
        $validacao = $credenciais->setCredenciais($dadosFuncionario->login, $dadosFuncionario->senha, true);
        if (!$validacao) {
            return $this->funcionarioView->autenticacaoInvalida();
        }
    
        $funcionarioParaCadastro = new Funcionario('', $dadosFuncionario->login, $dadosFuncionario->email, $credenciais, $dadosFuncionario->permissao);
    
        $funcionarioService = new FuncionarioService($funcionarioParaCadastro);
        
        // Verifica se o login ou email já existem
        if ($funcionarioService->emailOuLoginJaExiste($funcionarioParaCadastro->credenciais->getLogin(), $funcionarioParaCadastro->email)) {
            return $this->funcionarioView->erroCadastro('Email ou login já estão em uso.');
        }
    
        $funcionarioCadastrado = $funcionarioService->cadastrarFuncionario();
    
        if ($funcionarioCadastrado instanceof FuncionarioParaExibicao) {
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

        $funcionarioService = new LoginService($credenciais);
        $funcionario = $funcionarioService->autenticarFuncionario();

        if($funcionario instanceof FuncionarioParaExibicao) {
            $this->funcionarioView->retornaFuncionario($funcionario, 200);
        } else {
            $this->funcionarioView->autenticacaoInvalida();
        }
    }

    public function logoutFuncionario(): void  {
        $sessao = new SessaoService();
        if($sessao->realizarLogout()) {
            $this->funcionarioView->logout();
        } else {
            $this->funcionarioView->erroServidor();
        }
    }
}

?>