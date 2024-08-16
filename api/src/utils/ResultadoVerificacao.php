<?php

namespace src\utils;

class ResultadoVerificacao {
    private bool $encontrado;
    private string $mensagem;

    public function __construct(bool $encontrado, string $mensagem) {
        $this->encontrado = $encontrado;
        $this->mensagem = $mensagem;
    }

    public function encontrado(): bool{
        return $this->encontrado;
    }

    public function mensagem(): string {
        return $this->mensagem;
    }
}

?>
