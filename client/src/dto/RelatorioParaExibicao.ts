export class RelatorioParaExibicao {

    qtdEmprestimosPeriodo: number;
    valorTotalPeriodo: number;
    mediaPeriodo: number;
    emprestimosDoPeriodo: { cliente: string, valor: number, dataEmprestimo: string }[];
    dadosDosDias: { dia: string, qtdEmprestimosDia: number, valorTotalDia: number }[];

    constructor(qtdEmprestimosPeriodo: number, valorTotalPeriodo: number, mediaPeriodo: number, 
            emprestimosDoPeriodo: [], dadosDosDias: []) {
        this.qtdEmprestimosPeriodo = qtdEmprestimosPeriodo;
        this.valorTotalPeriodo = valorTotalPeriodo;
        this.mediaPeriodo = mediaPeriodo;
        this.emprestimosDoPeriodo = emprestimosDoPeriodo;
        this.dadosDosDias = dadosDosDias;
    }
} 