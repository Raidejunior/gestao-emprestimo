export class RelatorioParaExibicao {

    qtdEmprestimosPeriodo: number;
    valorTotalPeriodo: string | number;
    mediaPeriodo: string | number;
    emprestimosDoPeriodo: { indice: number, cliente: string, valor: number, dataEmprestimo: string }[];
    dadosDosDias: { dia: string, qtdEmprestimosDia: number, valorTotalDia: number }[];

    constructor(qtdEmprestimosPeriodo: number, valorTotalPeriodo: string | number, mediaPeriodo: string | number, 
            emprestimosDoPeriodo: [], dadosDosDias: []) {
        this.qtdEmprestimosPeriodo = qtdEmprestimosPeriodo;
        this.valorTotalPeriodo = valorTotalPeriodo;
        this.mediaPeriodo = mediaPeriodo;
        this.emprestimosDoPeriodo = emprestimosDoPeriodo;
        this.dadosDosDias = dadosDosDias;
    }
} 