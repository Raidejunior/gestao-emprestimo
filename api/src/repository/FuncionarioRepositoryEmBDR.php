<?php

namespace src\repository;

use Exception;
use PDO;
use src\model\Credenciais;
use src\model\Funcionario;

class FuncionarioRepositoryEmBDR implements FuncionarioRepository {

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function autenticarFuncionario(Credenciais $credenciais): ?Funcionario {
        $ps = $this->pdo->prepare(
            'SELECT id, login, email, permissao, senha FROM funcionario WHERE login = :login'
        );
        $ps->execute([
            'login' => $credenciais->getLogin()
        ]);
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);

        if(count($dados) > 0) {
            $dadosFuncionario = $dados[0];
            $hashArmazenado = $dadosFuncionario['senha'];
            $verificacao = $credenciais->compararHash($hashArmazenado);

            if($verificacao) {
                return new Funcionario($dadosFuncionario['id'], $dadosFuncionario['login'], $dadosFuncionario['email'], 
                    null, intval($dadosFuncionario['permissao']) === Funcionario::FUNCIONARIO ? Funcionario::FUNCIONARIO : Funcionario::GERENTE);
            }

            return null;
        }

        return null;

    }

    public function cadastrarFuncionario(Funcionario $funcionario): ?Funcionario {

        $this->pdo->beginTransaction();

        try {
            $ps = $this->pdo->prepare(
                'INSERT INTO funcionario(login, email, senha, permissao) VALUES (
                    :login, :email, :senha, :permissao
                )'
            );
            $inserido = $ps->execute([
                'login' => $funcionario->login,
                'email' => $funcionario->email,
                'permissao' => $funcionario->permissao === Funcionario::FUNCIONARIO ? '1' : '2',
                'senha' => $funcionario->credenciais->getSenha(),
            ]);

            if($inserido){
                $this->pdo->commit();
                return $funcionario;
            } 
            $this->pdo->rollBack();
            return null;
        
        } catch(Exception $e) {
            $this->pdo->rollBack();
            return null;
        }
    }
}

?>