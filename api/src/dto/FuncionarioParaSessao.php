<?php

namespace src\dto;

class FuncionarioParaSessao {

    public string $id = '';
    public string $nome = '';
    public string $permissao = '';

    public function __construct(string $id, string $nome, string $permissao){
        $this->id= $id;
        $this->id= $nome;
        $this->permissao= $permissao;
    }
}

?>