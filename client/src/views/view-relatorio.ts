import 'anychart'; 

import { RelatorioParaExibicao } from "../dto/RelatorioParaExibicao";

export class VisaoRelatorio {
    
    dataInicio(): string {
        return ( document.getElementById('dataInicio') as HTMLInputElement ).value;
    }

    dataTermino(): string {
        return ( document.getElementById('dataTermino') as HTMLInputElement ).value;
    }

    montarRelatorio(relatorio: RelatorioParaExibicao) {
        let dadosDosDias = [];
        for(let d of relatorio.dadosDosDias) { // montando os dados de cada dia do período, colocando cadia dia diferente em uma coluna
            let dados = [d.dia, d.valorTotalDia];
            dadosDosDias.push(dados);
        }

        const chart = anychart.column();
        chart.column(dadosDosDias);
        chart.title('Relatório do período');
        chart.xAxis().title("Dias");
        chart.yAxis().title("Total emprestado (R$)");
        chart.container("anychart-container");
        chart.draw();

    }

    configurarGerarRelatorio(funcao: Function) {
        ( document.getElementById('gerarRelatorio') as HTMLButtonElement ).addEventListener('click', e => {
            e.preventDefault();

            funcao();
        });
    }

    configurarDatas() {
        const hoje = new Date();
        const primeiroDiaProxMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1);
        const ultimoDiaDoMesAtualEmMiliSeg = new Date(primeiroDiaProxMes.getTime() - 1); // primeiro dia do próximo mês menos 1 milisegundo para retornar o último dia do mês atual
        const ultimoDiaDoMesAtual = new Date(ultimoDiaDoMesAtualEmMiliSeg);
        const primeiroDiaDoMesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

        const primeiroDiaDoMesAtualFormatado = this.formatarValorData(primeiroDiaDoMesAtual);
        const ultimoDiaDoMesAtualFormatado = this.formatarValorData(ultimoDiaDoMesAtual);

        ( document.getElementById('dataInicio') as HTMLInputElement ).value = primeiroDiaDoMesAtualFormatado;
        ( document.getElementById('dataTermino') as HTMLInputElement ).value = ultimoDiaDoMesAtualFormatado;
    }

    private formatarValorData(data: Date): string {
        let dia = data.getDate().toString();
        let mes = (data.getMonth() + 1).toString();
        let ano = data.getFullYear().toString();

        if(Number(dia) < 10) {
            dia = `0${dia}`; 
        }
        if(Number(mes) < 10) {
            mes = `0${mes}`;
        }

        return `${ano}-${mes}-${dia}`;
    }

}