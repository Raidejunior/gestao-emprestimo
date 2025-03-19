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

    public function autenticarFuncionario(Credenciais $credenciais, bool $logandoComEmail): ?Funcionario {
        $sql = '';
        if($logandoComEmail) {
            $sql = 'SELECT id, nome, login, email, permissao, senha FROM funcionario WHERE email = :valor';
        } else {
            $sql = 'SELECT id, nome, login, email, permissao, senha FROM funcionario WHERE login = :valor';
        }

        $ps = $this->pdo->prepare($sql);
        $ps->execute([
            'valor' => $credenciais->getLogin()
        ]);
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);

        if(count($dados) > 0) {
            $dadosFuncionario = $dados[0];

            $hashArmazenado = $dadosFuncionario['senha'];
            $verificacao = $credenciais->compararHash($hashArmazenado);

            if($verificacao) {
                return new Funcionario($dadosFuncionario['id'], $dadosFuncionario['nome'], $dadosFuncionario['email'], 
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
                'INSERT INTO funcionario(nome, login, email, senha, permissao) VALUES (
                    :nome, :login, :email, :senha, :permissao
                )'
            );
            $inserido = $ps->execute([
                'nome' => $funcionario->nome,
                'login' => $funcionario->credenciais->getLogin(),
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

    public function emailOuLoginJaExiste(string $login, string $email): bool {
        $ps = $this->pdo->prepare(
            'SELECT COUNT(*) FROM funcionario WHERE login = :login OR email = :email'
        );
        $ps->execute([
            'login' => $login,
            'email' => $email
        ]);
    
        return $ps->fetchColumn() > 0; // Retorna true se existe pelo menos um registro
    }
    
}

?>