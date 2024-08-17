<?php

namespace src\dto;

use src\utils\AtributosInvalidos;

class PeriodoParaRelatorio {

    public string $dataInicio = '';
    public string $dataTermino = '';

    public AtributosInvalidos $atributosInvalidos;

    public function __construct(array $dados){
        $this->atributosInvalidos = new AtributosInvalidos();

        $this->dataInicio = $dados['dataInicio'] ?? null;
        $this->dataTermino = $dados['dataTermino'] ?? null;

        $this->valida();
    }

    private function valida(): void {
        // Valida cada atributo
        [$ano, $mes, $dia] = explode('-', $this->dataInicio);
        if ($this->dataInicio === null || trim($this->dataInicio) === '' || ! checkdate($mes, $dia, $ano)) {
            $this->tratarInvalido('data de início');
        }
        
        [$ano, $mes, $dia] = explode('-', $this->dataTermino);
        if ($this->dataTermino === null || trim($this->dataTermino) === '' || ! checkdate($mes, $dia, $ano)) {
            $this->tratarInvalido('data de término');
        }
    }

    private function tratarInvalido(string $atributo): void {
        $this->atributosInvalidos->adicionar($atributo);
    }
}