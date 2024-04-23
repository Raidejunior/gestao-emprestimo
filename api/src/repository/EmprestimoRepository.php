<?php
namespace src\repository;

use PDO;
use src\model\Emprestimo;

class EmprestimoRepository{

    private PDO $pdo;

    function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;        
    }


    /**
     * Responsável por trazer todos os empréstimos que estão no banco de dados.
     * 
     */
    function buscarTodosEmprestimos() {
        $sql = "SELECT e.data_emprestimo, c.nome AS cliente_nome, e.valor, fp.meses AS parcelas, fp.juros 
            FROM emprestimo e
            JOIN cliente c ON c.id = e.cliente_id
            JOIN forma_pagamento fp ON fp.id = e.forma_pagamento_id
            ORDER BY e.data_emprestimo DESC
        "; 
        $ps = $this->pdo->prepare($sql);
        $ps->execute();
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);

        return $dados;
    }


    /**
     * Responsável pela inserção do empréstimo no banco de dados.
     * @param Emprestimo $emprestimo
     * @return int
     */
    function salvarEmprestimo(Emprestimo $emprestimo) : int{
        $ps = $this->pdo->prepare('INSERT INTO emprestimo(cliente_id, valor, forma_pagamento_id ) 
            VALUES 
                (:cliente_id, :valor, :forma_pagamento_id)');

        $inserido = $ps->execute([
            'cliente_id' => $emprestimo->cliente->id,
            'valor' => $emprestimo->valorSolicitado,
            'forma_pagamento_id' => $emprestimo->formaPagamento->id
        ]);

        if($inserido){
            $rowCount = $ps->rowCount();
            if($rowCount > 0){
                return $this->pdo->lastInsertId();
            }
            else{
                return -1;
            }
        }
        else
        {
            return -1;
        }

    }
}