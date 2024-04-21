<?php
namespace src\repository;
use PDO;

require_once 'vendor/autoload.php';

use src\model\Cliente;

class ClienteRepository{
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
    
    /**
     * Recebe um cpf e faz a busca dele no banco de dados.
     * @param string $cpf
     * @return array|false
     */
     public function retornaClientePorCPF( int $cpf ) {
        $ps = $this->pdo->prepare(
            'SELECT * FROM cliente WHERE cpf = :cpf'
        );
        //$ps->setFetchMode( PDO::FETCH_CLASS);
        $ps->execute( ['cpf' => $cpf] );

        $dados = $ps->fetch(PDO::FETCH_ASSOC);

        return $dados;
     }

}