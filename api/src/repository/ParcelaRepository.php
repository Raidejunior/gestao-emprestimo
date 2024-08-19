<?php

namespace src\repository;

use Exception;
use PDO;
use src\dto\ParcelaParaPagamento;
use src\model\Parcela;

class ParcelaRepository{

    private PDO $pdo;

    function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;        
    }

    /**
     * Salva as parcelas de um empréstimo no banco de dados
     */
    public function salvarParcelas(Parcela $parcela, $idEmprestimo) {
        $sql = " INSERT INTO parcela(numero, valor, vencimento, emprestimo_id) 
                VALUES
                    (:numero, :valor, :vencimento, :emprestimoId)
        ";
        $ps = $this->pdo->prepare($sql);
        $ps->execute([
            'numero' => $parcela->numero,
            'valor' => $parcela->valor,
            'vencimento' => $parcela->vencimento,
            'emprestimoId' => $idEmprestimo
        ]);

        $rowCount = $ps->rowCount();
        if($rowCount > 0) {
            return true;
        }
        return false;
    }

    public function pagarParcela(ParcelaParaPagamento $parcela): bool {
        try {
            $this->pdo->beginTransaction();
            $sql = "UPDATE parcela 
                SET status = 'paga', 
                data_pagamento = CURRENT_TIMESTAMP, 
                funcionario_id_pagamento = :idFuncionario 
                WHERE id = :idParcela AND emprestimo_id = :idEmprestimo
            ";
            return true;
        } catch(Exception $e) {
            return false;
        }
    }

}