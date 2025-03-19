<?php

namespace src\service;

use src\dto\FuncionarioParaExibicao;
use src\dto\FuncionarioParaSessao;
use src\model\Credenciais;
use src\model\Funcionario;
use src\repository\DBConnection;
use src\repository\FuncionarioRepository;
use src\repository\FuncionarioRepositoryEmBDR;

class LoginService {
    private Credenciais $credenciais;
    private FuncionarioRepository $funcionarioRepository;
    
    public function __construct(Credenciais $credenciais) {
        $this->credenciais = $credenciais;
    }

    public function autenticarFuncionario(): ?FuncionarioParaExibicao {
        $funcLogandoComEmail = $this->credenciais->logandoComEmail();
        $pdo = DBConnection::conectar();
        $this->funcionarioRepository = new FuncionarioRepositoryEmBDR($pdo);
        $funcionario = $this->funcionarioRepository->autenticarFuncionario($this->credenciais, $funcLogandoComEmail);

        if($funcionario instanceof Funcionario) {
            $funcionarioParaSessao = new FuncionarioParaSessao($funcionario->id, $funcionario->permissao);
            $sessaoService = new SessaoService();
            $sessaoService->registrarFuncionario($funcionarioParaSessao);

            $funcionarioParaExibicao = new FuncionarioParaExibicao($funcionario->nome, $funcionario->email, $funcionario->permissao);
            return $funcionarioParaExibicao;
        }

        return null;
    }
}

?>