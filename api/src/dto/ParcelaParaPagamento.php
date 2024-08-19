<?php

namespace src\dto;

use src\utils\AtributosInvalidos;

class ParcelaParaPagamento {

    public string $parcelaId = '';
    public string $emprestimoId = '';

    public AtributosInvalidos $atributosInvalidos;

    public function __construct(array $dados){
        $this->atributosInvalidos = new AtributosInvalidos();

        $this->parcelaId = $dados['parcelaId'] ?? null;
        $this->emprestimoId = $dados['emprestimoId'] ?? null;

        $this->valida();
    }

    private function valida(): void {
        // Valida cada atributo
        if ($this->parcelaId === null || trim($this->parcelaId) === '' || ! is_numeric($this->parcelaId)) {
            $this->tratarInvalido('parcelaId');
        }
        
        if ($this->emprestimoId === null || trim($this->emprestimoId) === '' || ! is_numeric($this->emprestimoId)) {
            $this->tratarInvalido('emprestimoId');
        }
    }

    private function tratarInvalido(string $atributo): void {
        $this->atributosInvalidos->adicionar($atributo);
    }
}