<?php

class ClienteRepository{
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    
    /**
     * @param string $cpf Cpf
     * @return Cliente|null
     */

     public function retornaClientePorCPF( int $cpf ): Cliente | null {
        $ps = $this->pdo->prepare(
            'SELECT * FROM cliente WHERE cpf = :cpf'
        );
        $ps->setFetchMode( PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE,
        'Cliente'
    );
        $ps->execute( ['cpf' => $cpf] );

        return $ps->fetchObject('Cliente');
     }

}