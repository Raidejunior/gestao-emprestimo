<?php
namespace src\dto;

class FuncionarioParaCadastro {
    public ?string $nome;
    public ?string $dataNascimento;
    public ?string $cpf;
    public ?string $telefone;
    public ?string $email;
    public ?string $endereco;
    public ?string $senha;
    public ?string $permissao;

    public array $atributosInvalidos = [];

    public function __construct(array $dados) {
        $this->nome = $dados['login'] ?? $this->tratarInvalido('login');
        $this->email = $dados['email'] ?? $this->tratarInvalido('email') ; 
        $this->senha = $dados['senha'] ?? $this->tratarInvalido('senha') ;
        $this->permissao = $dados['permissao'] ?? $this->tratarInvalido('pemissão');
    }

    private function tratarInvalido(string $atributo): void {
        array_push($this->atributosInvalidos, "O atributo $atributo é obrigatório");
    }
}

?>