<?php

namespace src\service;

use src\dto\FuncionarioParaExibicao;
use src\model\Funcionario;
use src\repository\DBConnection;
use src\repository\FuncionarioRepository;
use src\repository\FuncionarioRepositoryEmBDR;

class FuncionarioService {
    private Funcionario $funcionario;
    private FuncionarioRepository $funcionarioRepository;
    
    public function __construct(Funcionario $funcionario) {
        $this->funcionario = $funcionario;
    }

    public function cadastrarFuncionario(): ?FuncionarioParaExibicao {
        $pdo = DBConnection::conectar();
        $this->funcionarioRepository = new FuncionarioRepositoryEmBDR($pdo);
        $funcionario = $this->funcionarioRepository->cadastrarFuncionario($this->funcionario);

        if($funcionario instanceof Funcionario) {
            $funcionarioParaExibicao = new FuncionarioParaExibicao($funcionario->login, $funcionario->email, $funcionario->permissao);
            return $funcionarioParaExibicao;
        }

        return null;
    }

}

?>