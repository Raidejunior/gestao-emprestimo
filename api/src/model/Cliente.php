<?php

namespace src\model;

use src\repository\ClienteRepository;
use src\repository\ClienteRepositoryEmBDR;
use src\repository\DBConnection;

class Cliente {
    public string $id;
    public string $nome;
    public string $cpf;
    public string $dataNascimento;
    public string $email;
    public string $telefone;
    public string $endereco;
    public float $limiteCredito;

    public function __construct($id = '', $nome = '', $cpf = '', $dataNascimento = '', $email = '', $telefone = '', 
        $endereco = '', $limiteCredito = 0) {
        $this->id = $id;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->dataNascimento = $dataNascimento;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->endereco = $endereco;
        $this->limiteCredito = $limiteCredito;
    }
}
?>
