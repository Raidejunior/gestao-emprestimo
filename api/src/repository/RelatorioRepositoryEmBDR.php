<?php

namespace src\repository;

use Exception;
use PDO;
use src\model\Cliente;

class RelatorioRepositoryEmBDR implements RelatorioRepository{
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function emprestimosNoPeriodo(string $dataInicio, string $dataTermino): ?array {
        try {
            $ps = $this->pdo->prepare(
                'SELECT cliente.nome as cliente, emprestimo.valor, emprestimo.data_emprestimo 
                FROM emprestimo
                JOIN cliente ON(cliente.id = emprestimo.cliente_id)
                WHERE DATE(data_emprestimo) BETWEEN :dataInicio AND :dataTermino'
            );
            $ps->execute([
                'dataInicio' => $dataInicio,
                'dataTermino' => $dataTermino,
            ]);

            $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
            return $dados;
            
        } catch(Exception $e) {
            return null;
        }
    }

    public function dadosDosDiasNoPeriodo(string $dataInicio, string $dataTermino): ?array {
        try {
            $ps = $this->pdo->prepare(
                'SELECT DATE(data_emprestimo) as data, COUNT(*) as qtd_emprestimos_dia, SUM(valor) as valor_total_dia
                FROM emprestimo
                WHERE DATE(data_emprestimo) BETWEEN :dataInicio AND :dataTermino
                GROUP BY data'
            );
            $ps->execute([
                'dataInicio' => $dataInicio,
                'dataTermino' => $dataTermino,
            ]);

            $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
            return $dados;
            
        } catch(Exception $e) {
            return null;
        }
    }

    public function dadosGeraisNoPeriodo(string $dataInicio, string $dataTermino): ?array {
        try {
            $ps = $this->pdo->prepare(
                'SELECT
                    SUM(qtd_emprestimos_dia) as total_emprestimos_periodo,
                    SUM(valor_total_dia) as total_valor_periodo,
                    (SUM(valor_total_dia) / COUNT(*) ) as media_periodo
                FROM (
                SELECT DATE(data_emprestimo) as data, COUNT(*) as qtd_emprestimos_dia, SUM(valor) as valor_total_dia
                FROM emprestimo
                WHERE DATE(data_emprestimo) BETWEEN :dataInicio AND :dataTermino
                GROUP BY data
                ) as subconsulta'
            );
            $ps->execute([
                'dataInicio' => $dataInicio,
                'dataTermino' => $dataTermino,
            ]);

            $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
            return $dados;
            
        } catch(Exception $e) {
            return null;
        }
    }

}