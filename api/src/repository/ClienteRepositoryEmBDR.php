<?php

namespace src\repository;

use Exception;
use PDO;
use src\model\Cliente;

class ClienteRepositoryEmBDR implements ClienteRepository{
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
    
    public function cadastrarCliente(Cliente $cliente): ?Cliente {
        $this->pdo->beginTransaction();

        try {
            $ps = $this->pdo->prepare(
                'INSERT INTO cliente(nome, cpf, data_nascimento, email, telefone, endereco, limite_credito, senha) VALUES (
                    :nome, :cpf, :data_nascimento, :email, :telefone, :endereco, :limite_credito, :senha
                )'
            );
            $inserido = $ps->execute([
                'nome' => $cliente->nome,
                'cpf' => $cliente->cpf,
                'data_nascimento' => $cliente->dataNascimento,
                'email' => $cliente->email,
                'telefone' => $cliente->telefone,
                'endereco' => $cliente->endereco,
                'limite_credito' => $cliente->limiteCredito,
                'senha' => $cliente->credenciais->getSenha(),
            ]);

            if($inserido){
                $this->pdo->commit();
                return $cliente;
            } 
            $this->pdo->rollBack();
            return null;
            
        } catch(Exception $e) {
            $this->pdo->rollBack();
            return null;
        }
    }

    public function retornaClientePorCPF( int $cpf ) {
    $ps = $this->pdo->prepare(
        'SELECT * FROM cliente WHERE cpf = :cpf'
    );

    $ps->execute( ['cpf' => $cpf] );

    $dados = $ps->fetch(PDO::FETCH_ASSOC);

    return $dados;
    }

}