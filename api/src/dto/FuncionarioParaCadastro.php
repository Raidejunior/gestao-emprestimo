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
        $this->nome = $dados['nome'] ?? $this->tratarInvalido('nome');
        $this->dataNascimento = $dados['dataNascimento'] ?? $this->tratarInvalido('data de nascimento');
        $this->cpf = $dados['cpf'] ?? $this->tratarInvalido('CPF');
        $this->telefone = $dados['telefone'] ?? $this->tratarInvalido('telefone');
        $this->email = $dados['email'] ?? $this->tratarInvalido('email') ;
        $this->endereco = $dados['endereco'] ?? $this->tratarInvalido('endereço');  
        $this->senha = $dados['senha'] ?? $this->tratarInvalido('senha') ;
        $this->permissao = $dados['permissao'] ?? $this->tratarInvalido('pemissão');
    }

    private function tratarInvalido(string $atributo): void {
        array_push($this->atributosInvalidos, "O atributo $atributo é obrigatório");
    }
}

?>