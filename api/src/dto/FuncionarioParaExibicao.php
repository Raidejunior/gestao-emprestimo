<?php

namespace src\dto;

class FuncionarioParaExibicao {
    public string $login;
    public string $email;
    public int $permissao;

    public function __construct($login, $email, $permissao) {
        $this->login = $login;
        $this->email = $email;
        $this->permissao = intval($permissao);
    }
}

?>