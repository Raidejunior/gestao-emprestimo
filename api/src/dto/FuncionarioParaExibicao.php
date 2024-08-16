<?php

namespace src\dto;

class FuncionarioParaExibicao {
    public string $nome;
    public string $dataNascimento;
    public string $email;
    public string $telefone;
    public string $permissao;

    public function __construct($nome, $dataNascimento, $email, $telefone, $permissao) {
        $this->nome = $nome;
        $this->dataNascimento = $dataNascimento;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->permissao = $permissao;
    }
}

?>