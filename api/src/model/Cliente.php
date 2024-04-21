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

    // Getters e Setters

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }


    public function getNome() {
        return $this->nome;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function getCPF() {
        return $this->cpf;
    }

    public function setCPF($cpf) {
        $this->cpf = $cpf;
    }

    public function getDataNascimento() {
        return $this->dataNascimento;
    }

    public function setDataNascimento($dataNascimento) {
        $this->dataNascimento = $dataNascimento;
    }
}
?>
