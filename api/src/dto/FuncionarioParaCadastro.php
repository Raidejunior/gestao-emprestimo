<?php
namespace src\dto;

use src\utils\AtributosInvalidos;

class FuncionarioParaCadastro {
    public ?string $login;
    public ?string $email;
    public ?string $senha;
    public ?string $permissao;

    public AtributosInvalidos $atributosInvalidos;

    public function __construct(array $dados) {
        $this->atributosInvalidos = new AtributosInvalidos();
        $this->login = $dados['login'] ?? null;
        $this->email = $dados['email'] ?? null; 
        $this->senha = $dados['senha'] ?? null;
        $this->permissao = $dados['permissao'] ?? null;

        $this->valida();
    }

    public function chamarConstrutorParaTeste(array $dados = []) {
        $this->__construct($dados); // Chama o construtor novamente apenas para fins de teste.
    }

    private function valida(): void {
        // Valida cada atributo
        if ($this->login === null || $this->login === '') {
            $this->tratarInvalido('login');
        }
        if ($this->email === null || $this->email === '') {
            $this->tratarInvalido('email');
        }
        if ($this->senha === null || $this->senha === '') {
            $this->tratarInvalido('senha');
        }
        if ($this->permissao === null || $this->permissao === '') {
            $this->tratarInvalido('permissao');
        }
    }

    private function tratarInvalido(string $atributo): void {
        $this->atributosInvalidos->adicionar($atributo);
    }
}

?>