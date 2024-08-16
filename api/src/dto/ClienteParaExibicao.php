<?php

namespace src\dto;

class ClienteParaExibicao {
    public string $nome;
    public string $dataNascimento;
    public string $email;
    public string $telefone;
    public float $limiteCredito;

    public function __construct($nome, $dataNascimento, $email, $telefone, $limiteCredito) {
        $this->nome = $nome;
        $this->dataNascimento = $dataNascimento;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->limiteCredito = $limiteCredito;
    }
}