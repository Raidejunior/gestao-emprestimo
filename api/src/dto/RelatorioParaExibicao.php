<?php

namespace src\dto;

class RelatorioParaExibicao {
    /** @var EmprestimoParaExibicao[] */
    public array $emprestimosDoPeriodo = [];
    /** @var DadosDoDiaParaRelatorio[] */
    public array $dadosDosDias = [];

    public int $qtdEmprestimosPeriodo;
    public float $valorTotalPeriodo;
    public float $mediaPeriodo;

    public function setEmprestimosPeriodo(array $emprestimos) {
        foreach($emprestimos as $emprestimo) {
            $empExibicao = new EmprestimoParaExibicao($emprestimo['cliente'], $emprestimo['valor'], $emprestimo['data_emprestimo']);
            array_push($this->emprestimosDoPeriodo, $empExibicao);
        }
    }

    public function setDadosDosDias(array $dadosDias) {
        foreach($dadosDias as $dia) {
            $dadosDia = new DadosDoDiaParaRelatorio($dia['data'], $dia['qtd_emprestimos_dia'], $dia['valor_total_dia']);
            array_push($this->dadosDosDias, $dadosDia);
        }
    }

    public function setDadosGerais(array $dados) {
        $dadosGerais = $dados[0];
        $this->qtdEmprestimosPeriodo = intval($dadosGerais['total_emprestimos_periodo']);
        $this->valorTotalPeriodo = floatval($dadosGerais['total_valor_periodo']);
        $this->mediaPeriodo = floatval($dadosGerais['media_periodo']);
    }
}