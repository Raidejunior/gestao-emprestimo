<?php 

namespace src\model;

class Funcionario {
    const FUNCIONARIO = 'F';
    const GERENTE = 'G';

    public string $id;
    public string $nome;
    public string $cpf;
    public string $dataNascimento;
    public string $telefone;
    public string $email;
    public string $endereco;
    public string $permissao;
    public ?Credenciais $credenciais;

    public function __construct($id, $nome, $cpf, $dataNascimento, $telefone, $email, $endereco,
        $credenciais, $permissao = self::FUNCIONARIO){
        $this->id = $id;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->dataNascimento = $dataNascimento;
        $this->telefone = $telefone;
        $this->email = $email;
        $this->endereco = $endereco;
        $this->permissao = $permissao;
        $this->credenciais = $credenciais;
    }
}

?>