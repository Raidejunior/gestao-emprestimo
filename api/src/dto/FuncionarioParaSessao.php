<?php

namespace src\dto;

class FuncionarioParaSessao {

    public string $id = '';
    public string $login = '';
    public string $permissao = '';

    public function __construct(string $id, string $login, string $permissao){
        $this->id= $id;
        $this->login= $login;
        $this->permissao= $permissao;
    }
}

?>