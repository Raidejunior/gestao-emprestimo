<?php

namespace src\dto;

class FuncionarioParaExibicao {
    public string $login;
    public string $email;
    public string $permissao;

    public function __construct($login, $email, $permissao) {
        $this->login = $login;
        $this->email = $email;
        $this->permissao = $permissao;
    }
}

?>