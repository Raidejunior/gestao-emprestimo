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
        $ps = $this->pdo->prepare('SELECT * FROM emprestimo ORDER BY data_emprestimo DESC');
        $ps->execute();
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);

        return $dados;
    }


    /**
     * Responsável pela inserção do empréstimo no banco de dados.
     * @param array $emprestimo
     * @return int
     */
    function salvarEmprestimo($emprestimo) : int{
        $ps = $this->pdo->prepare('INSERT INTO emprestimo(cliente_id, valor, forma_pagamento_id ) 
            VALUES 
                (:cliente_id, :valor, :forma_pagamento_id)');

        $inserido = $ps->execute([
            'cliente_id' => $emprestimo['cliente_id'],
            'valor' => $emprestimo['valor'],
            'forma_pagamento_id' => $emprestimo['forma_pagamento_id']
        ]);
        if($inserido)
        {
            $rowCount = $ps->rowCount();
            if($rowCount > 0)
            {
                return $this->pdo->lastInsertId();
            }
            else
            {
                return -1;
            }
        }
        else
        {
            return -1;
        }

    }
}