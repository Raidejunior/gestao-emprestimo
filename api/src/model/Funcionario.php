<?php 

namespace src\model;

class Funcionario {
    const FUNCIONARIO = 1;
    const GERENTE = 2;

    public string $id;
    public string $nome;
    public string $email;
    public int $permissao;
    public ?Credenciais $credenciais;

    public function __construct($id, $nome, $email, $credenciais, $permissao = self::FUNCIONARIO){
        $this->id = $id;
        $this->nome = $nome;
        $this->email = $email;
        $this->permissao = $permissao;
        $this->credenciais = $credenciais;
    }
}

?>