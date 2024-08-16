<?php

namespace src\utils;

class AtributosInvalidos
{
    private array $atributos = [];

    public function adicionar(string $atributo): void
    {
        $this->atributos[] = "O atributo $atributo é obrigatório ou foi enviado incorretamente";
    }

    public function contem(string $mensagem): ResultadoVerificacao{
        $encontrado = in_array($mensagem, $this->atributos);
        return new ResultadoVerificacao($encontrado, $mensagem);
    }

    public function todos(): array
    {
        return $this->atributos;
    }
}

?>
