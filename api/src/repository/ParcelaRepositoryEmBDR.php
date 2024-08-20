<?php

namespace src\repository;

use Exception;
use PDO;
use src\dto\ParcelaParaExibicao;
use src\dto\ParcelaParaPagamento;
use src\model\Parcela;

class ParcelaRepositoryEmBDR implements ParcelaRepository{

    private PDO $pdo;

    function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;        
    }

    /**
     * Salva as parcelas de um empréstimo no banco de dados
     */
    public function salvarParcelas(Parcela $parcela, $idEmprestimo): ?bool {
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
                funcionario_pagamento_id = :id_funcionario 
                WHERE id = :id_parcela AND emprestimo_id = :id_emprestimo
            ";
            $ps = $this->pdo->prepare($sql);
            $ps->execute([
                'id_funcionario' => $parcela->funcionarioId,
                'id_parcela' => $parcela->parcelaId,
                'id_emprestimo' => $parcela->emprestimoId
            ]);

            $rowCount = $ps->rowCount();
            if($rowCount > 0) {
                $this->pdo->commit();
                return true;
            }
            $this->pdo->rollBack();
            return false;

        } catch(Exception $e) {
            $this->pdo->rollBack();
            return false;
        }
    }

    function buscarTodasParcelasDeEmprestimoId($idEmprestimo): ?array {
        try {
            $sql = "SELECT p.id, p.numero, p.valor, p.vencimento, p.status, p.emprestimo_id, p.data_pagamento, f.nome as funcionario_confirmou
                    FROM parcela p
                    LEFT JOIN funcionario f ON (f.id = p.funcionario_pagamento_id)
                    WHERE p.emprestimo_id = :emprestimo_id
                    ORDER BY p.vencimento ASC
            ";
            $ps = $this->pdo->prepare($sql);
            $ps->execute([
                "emprestimo_id" => $idEmprestimo
            ]);

            $dadosParcelas = $ps->fetchAll(PDO::FETCH_ASSOC);
            if(!$dadosParcelas) {
                return null;
            }
            
            $parcelas = [];
            foreach($dadosParcelas as $p) {
                $parcela = new ParcelaParaExibicao($p['id'], $p['numero'], $p['valor'], $p['vencimento'], $p['status'], $p['data_pagamento'], 
                    $p['funcionario_confirmou'], $p['emprestimo_id']);
                array_push($parcelas, $parcela);
            }

            return $parcelas;
            
        } catch(Exception $e) {
            return null;
        }
    }

}