<?php
namespace src\dto;

use src\utils\AtributosInvalidos;

class ClienteParaCadastro {
    public ?string $nome;
    public ?string $dataNascimento;
    public ?string $cpf;
    public ?string $telefone;
    public ?string $email;
    public ?string $endereco;

    public ?float $limiteCredito;

    public AtributosInvalidos $atributosInvalidos;

    public function __construct(array $dados) {

        $this->atributosInvalidos = new AtributosInvalidos();

        $this->nome = $dados['nome'] ?? null;
        $this->dataNascimento = $dados['dataNascimento'] ?? null;
        $this->cpf = $dados['cpf'] ?? null;
        $this->telefone = $dados['telefone'] ?? null;
        $this->email = $dados['email'] ?? null;
        $this->endereco = $dados['endereco'] ?? null;
        $this->limiteCredito = $dados['limiteCredito'] ?? null;
        
        $this->valida();
    }

    public function chamarConstrutorParaTeste(array $dados = []) {
        $this->__construct($dados); // Chama o construtor novamente apenas para fins de teste.
    }

    private function valida(): void {
        // Valida cada atributo
        if ($this->nome === null || $this->nome === '') {
            $this->tratarInvalido('nome');
        }
        if ($this->dataNascimento === null || $this->dataNascimento === '') {
            $this->tratarInvalido('data de nascimento');
        }
        if ($this->cpf === null || $this->cpf === '') {
            $this->tratarInvalido('cpf');
        }
        if ($this->telefone === null || $this->telefone === '') {
            $this->tratarInvalido('telefone');
        }
        if ($this->email === null || $this->email === '') {
            $this->tratarInvalido('email');
        }
        if ($this->endereco === null || $this->endereco === '') {
            $this->tratarInvalido('endereço');
        }
        if ($this->limiteCredito === null || $this->limiteCredito === '' || !is_numeric($this->limiteCredito)) {
            $this->tratarInvalido('limite de crédito');
        }
    }

    private function tratarInvalido(string $atributo): void {
        $this->atributosInvalidos->adicionar($atributo);
    }
}

?>