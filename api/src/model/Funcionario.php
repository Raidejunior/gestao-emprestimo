<?php 

namespace src\model;

class Funcionario {
    const FUNCIONARIO = 1;
    const GERENTE = 2;

    public string $id;
    public string $login;
    public string $email;
    public int $permissao;
    public ?Credenciais $credenciais;

    public function __construct($id, $login, $email, $credenciais, $permissao = self::FUNCIONARIO){
        $this->id = $id;
        $this->login = $login;
        $this->email = $email;
        $this->permissao = $permissao;
        $this->credenciais = $credenciais;
    }
}

?>