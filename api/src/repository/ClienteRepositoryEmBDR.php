<?php

namespace src\repository;

use Exception;
use PDO;
use src\dto\ClienteParaCadastro;
use src\dto\ClienteParaExibicao;
use src\model\Cliente;

class ClienteRepositoryEmBDR implements ClienteRepository{
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
    
    public function cadastrarCliente(ClienteParaCadastro $cliente): ?ClienteParaExibicao {
        $this->pdo->beginTransaction();

        try {
            $ps = $this->pdo->prepare(
                'INSERT INTO cliente(nome, cpf, data_nascimento, email, telefone, endereco, limite_credito, senha) VALUES (
                    :nome, :cpf, :data_nascimento, :email, :telefone, :endereco, :limite_credito
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
            ]);

            if($inserido){
                $this->pdo->commit();
                $idCliente = intval($this->pdo->lastInsertId());
                return new ClienteParaExibicao($idCliente, $cliente->nome, $cliente->cpf, $cliente->dataNascimento, $cliente->email, $cliente->telefone, $cliente->endereco,
                    $cliente->limiteCredito, 0, $cliente->limiteCredito);
            } 
            $this->pdo->rollBack();
            return null;
            
        } catch(Exception $e) {
            $this->pdo->rollBack();
            return null;
        }
    }

    public function retornaClientePorCPF( string $cpf ): ?ClienteParaExibicao {
    $ps = $this->pdo->prepare(
        'SELECT * FROM cliente WHERE cpf = :cpf'
    );

    $ps->execute( ['cpf' => $cpf] );

    $dados = $ps->fetch(PDO::FETCH_ASSOC);

    if(!$dados) {
        return null;
    }
    
    $cliente = new ClienteParaExibicao(
        $dados["id"],
        $dados["nome"],
        $dados["cpf"],
        $dados["data_nascimento"],
        $dados["email"],
        $dados["telefone"],
        $dados["endereco"],
        $dados["limite_credito"],
    );
    return $cliente;

    }

    public function verificaLimiteCreditoUtilizadoCliente(int $clienteId): ?float {
        try {
            $ps = $this->pdo->prepare(
                'SELECT SUM(valor_a_pagar) as limite_utilizado_cliente
                FROM (
                    SELECT emprestimo.valor * ( 1 + (forma_pagamento.juros / 100) ) as valor_a_pagar,
                        cliente.limite_credito
                    FROM emprestimo
                    JOIN cliente ON(cliente.id = emprestimo.cliente_id)
                    JOIN forma_pagamento ON(forma_pagamento.id = emprestimo.forma_pagamento_id)
                    WHERE cliente.id = :id
                    GROUP BY emprestimo.id
                ) as subconsulta'
            );
    
            $ps->execute( ['id' => $clienteId] );
            $dados = $ps->fetch(PDO::FETCH_ASSOC);
            if(!$dados) {
                return null;
            }

            $limiteCreditoUtilizado = floatval($dados['limite_utilizado_cliente']);

            return $limiteCreditoUtilizado;

        } catch(Exception $e) {
            return null;
        }
    }

}