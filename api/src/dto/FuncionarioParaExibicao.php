<?php

namespace src\dto;

class FuncionarioParaExibicao {
    public string $nome;
    public string $email;
    public int $permissao;

    public function __construct($nome, $email, $permissao) {
        $this->nome = $nome;
        $this->email = $email;
        $this->permissao = intval($permissao);
    }
}

?>