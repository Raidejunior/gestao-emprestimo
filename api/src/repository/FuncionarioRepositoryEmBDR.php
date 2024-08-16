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
            'SELECT id, nome, cpf, data_nascimento, email, telefone, endereco, permissao, senha FROM funcionario WHERE nome = :nome'
        );
        $ps->execute([
            'nome' => $credenciais->getLogin()
        ]);
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);

        if(count($dados) > 0) {
            $dadosFuncionario = $dados[0];
            $hashArmazenado = $dadosFuncionario['senha'];
            $verificacao = $credenciais->compararHash($hashArmazenado);

            if($verificacao) {
                return new Funcionario($dadosFuncionario['id'], $dadosFuncionario['nome'], $dadosFuncionario['cpf'], $dadosFuncionario['data_nascimento'], $dadosFuncionario['telefone'], $dadosFuncionario['email'], $dadosFuncionario['endereco'], 
                    null, $dadosFuncionario['permissao'] === 'funcionario' ? Funcionario::FUNCIONARIO : Funcionario::GERENTE);
            }

            return null;
        }

        return null;

    }

    public function cadastrarFuncionario(Funcionario $funcionario): ?Funcionario {

        $this->pdo->beginTransaction();

        try {
            $ps = $this->pdo->prepare(
                'INSERT INTO funcionario(nome, cpf, data_nascimento, email, telefone, endereco, permissao, senha) VALUES (
                    :nome, :cpf, :data_nascimento, :email, :telefone, :endereco, :permissao, :senha
                )'
            );
            $inserido = $ps->execute([
                'nome' => $funcionario->nome,
                'cpf' => $funcionario->cpf,
                'data_nascimento' => $funcionario->dataNascimento,
                'email' => $funcionario->email,
                'telefone' => $funcionario->telefone,
                'endereco' => $funcionario->endereco,
                'permissao' => $funcionario->permissao === Funcionario::FUNCIONARIO ? 'funcionario' : 'gerente',
                'senha' => $funcionario->credenciais->getSenha(),
            ]);

            if($inserido){
                $this->pdo->commit();
                return $funcionario;
            } 
            $this->pdo->rollBack();
            return null;
        
        } catch(Exception $e) {
            echo $e;
            $this->pdo->rollBack();
            return null;
        }
    }
}

?>