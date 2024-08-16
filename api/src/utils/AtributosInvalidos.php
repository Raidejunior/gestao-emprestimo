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
        if ($encontrado) {
            // Busca o índice da mensagem encontrada
            $indice = array_search($mensagem, $this->atributos);
            // Retorna a mensagem real baseada no índice encontrado
            return new ResultadoVerificacao(true, $this->atributos[$indice]);
        }
        
        // Se não encontrado, retorna false com uma mensagem padrão ou nula
        return new ResultadoVerificacao(false, '');
    }

    public function todos(): array
    {
        return $this->atributos;
    }
}

?>
