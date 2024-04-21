<?php

namespace src\model;

require_once 'vendor/autoload.php';

use src\repository\DBConnection;
use src\repository\ClienteRepository;

class Cliente {
    private $id;
    private $nome;
    private $cpf;
    private $dataNascimento;

    public function __construct($id = null, $nome = null, $cpf = null, $dataNascimento = null) {
        $this->id = $id;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->dataNascimento = $dataNascimento;
    }

    /**
     * Responsável por chamar o repository para buscar cliente e retorná-lo.
     * @param int $cpf
     * @return array - Objeto cliente com os dados.
     */
    function buscaCPF($cpf) {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $cr = new ClienteRepository($pdo);
        $cliente = $cr->retornaClientePorCPF($cpf);
        return $cliente;
    }
}
?>
