<?php

namespace src\dto;

class ClienteParaExibicao {
    public int $id;
    public string $nome;
    public string $cpf;
    public string $dataNascimento;
    public string $email;
    public string $telefone;
    public string $endereco;
    public float $limiteCredito;
    public float $limiteCreditoUtilizado;
    public float $limiteCreditoDisponivel;
    public bool $erroAoCadastrar = false;

    public function __construct($id = 0, $nome = '', $cpf = '', $dataNascimento = '', $email ='',
            $telefone = '', $endereco = '', $limiteCredito = 0, $limiteCreditoUtilizado = 0, $limiteCreditoDisponivel = 0) {
        $this->id = $id;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->dataNascimento = $dataNascimento;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->endereco = $endereco;
        $this->limiteCredito = $limiteCredito;
        $this->limiteCreditoUtilizado = $limiteCreditoUtilizado;
        $this->limiteCreditoDisponivel = $limiteCreditoDisponivel;
    }
}