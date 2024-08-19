<?php

namespace src\dto;

class FuncionarioParaSessao {

    public string $id = '';
    public string $permissao = '';

    public function __construct(string $id, string $permissao){
        $this->id= $id;
        $this->permissao= $permissao;
    }
}

?>