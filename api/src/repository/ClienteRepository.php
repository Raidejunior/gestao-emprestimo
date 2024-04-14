<?php

require_once 'src/model/Cliente.php';

class ClienteRepository{
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
    
    /**
     * @param string $cpf Cpf
     * @return Cliente|null
     */

     public function retornaClientePorCPF( int $cpf ): Cliente {
        $ps = $this->pdo->prepare(
            'SELECT * FROM cliente WHERE cpf = :cpf'
        );
        //$ps->setFetchMode( PDO::FETCH_CLASS);
        $ps->execute( ['cpf' => $cpf] );

        $dados = $ps->fetch(PDO::FETCH_ASSOC);

        $cliente = new Cliente($dados["id"], $dados["nome"], $dados["cpf"], $dados["dataNascimento"]);

        return $cliente;
     }

}