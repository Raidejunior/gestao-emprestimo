<?php

namespace src\dto;

class RelatorioParaExibicao {
    public array $emprestimosDoPeriodo = [];
    public array $dadosDosDias = [];

    public int $qtdEmprestimosPeriodo;
    public float $valorTotalPeriodo;
    public float $mediaPeriodo;

    public function setEmprestimosPeriodo(array $emprestimos) {
        $i = 1;
        foreach($emprestimos as $emprestimo) {
            [$ano, $mes, $dia] = explode('-', $emprestimo['data_emprestimo']);
            $dataFormatada = $dia . '/' . $mes . '/' . $ano;
            $empExibicao = new EmprestimoParaExibicao($emprestimo['cliente'], $emprestimo['valor'], $dataFormatada, $i);
            array_push($this->emprestimosDoPeriodo, $empExibicao);
            $i++;
        }
    }

    public function setDadosDosDias(array $dadosDias) {
        foreach($dadosDias as $dadoDia) {
            [$ano, $mes, $dia] = explode('-', $dadoDia['data']);
            $dataFormatada = $dia . '/' . $mes . '/' . $ano;
            $dadosDiaParaRel = new DadosDoDiaParaRelatorio($dataFormatada, $dadoDia['qtd_emprestimos_dia'], $dadoDia['valor_total_dia']);
            array_push($this->dadosDosDias, $dadosDiaParaRel);
        }
    }

    public function setDadosGerais(array $dados) {
        $dadosGerais = $dados[0];
        $this->qtdEmprestimosPeriodo = intval($dadosGerais['total_emprestimos_periodo']);
        $this->valorTotalPeriodo = floatval($dadosGerais['total_valor_periodo']);
        $this->mediaPeriodo = floatval($dadosGerais['media_periodo']);
    }
}