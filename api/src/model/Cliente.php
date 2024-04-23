<?php

namespace src\model;

require_once 'vendor/autoload.php';

use src\repository\DBConnection;
use src\repository\ClienteRepository;

class Cliente {
    public $id;
    public $nome;
    public $cpf;
    public $dataNascimento;

    public function __construct($id = null, $nome = null, $cpf = null, $dataNascimento = null) {
        $this->id = $id;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->dataNascimento = $dataNascimento;
    }

    /**
     * Responsável por chamar o repository para buscar cliente e retorná-lo.
     * @param string $cpf
     * @return Cliente - Objeto cliente com os dados ou null caso o cliente não seja encontrado
     */
    function buscaCPF($cpf) {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $cr = new ClienteRepository($pdo);
        $dadosCliente = $cr->retornaClientePorCPF($cpf);
        if(!$dadosCliente) {
            return null;
        }

        $cliente = new Cliente(
            $dadosCliente["id"],
            $dadosCliente["nome"],
            $dadosCliente["cpf"],
            $dadosCliente["data_nascimento"]
        );
        
        return $cliente;
    }
}
?>
