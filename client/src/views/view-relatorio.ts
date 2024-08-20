import 'anychart'; 

import { RelatorioParaExibicao } from "../dto/RelatorioParaExibicao";
import { formataValorParaReais } from '../utils/FormataValorParaReais';

export class VisaoRelatorio {
    
    dataInicio(): string {
        return ( document.getElementById('dataInicio') as HTMLInputElement ).value;
    }

    dataTermino(): string {
        return ( document.getElementById('dataTermino') as HTMLInputElement ).value;
    }

    montarRelatorio(relatorio: RelatorioParaExibicao) {
        document.getElementById('relatorio')!.innerHTML = `
            <div id="anychart-container"></div>
            <div id="info-relatorio"></div>
            <button id="mostrar-dados" class="btn btn-primary">Mostrar dados</button>
            <table class="table table-striped" id="emprestimos-periodo" hidden></table>
        `; // zerando a seção de relatório, caso já exista algum conteudo nela

        let dadosDosDias = [];
        for(let d of relatorio.dadosDosDias) { // montando os dados de cada dia do período, colocando cadia dia diferente em uma coluna
            let dados = [d.dia, d.valorTotalDia];
            dadosDosDias.push(dados);
        }

        console.log(dadosDosDias);

        const chart = anychart.column(); // montando o gráfico

        const data = anychart.data.set(dadosDosDias);
        const colunaConfig = data.mapAs({x: 0, value: 1, fill: 3, stroke: 5, label: 6});
        const coluna = chart.column(colunaConfig);
        coluna.name("Total do dia (R$)");

        chart.title('Relatório do período');
        chart.xAxis().title("Dias");
        chart.yAxis().title("Total emprestado (R$)");
        chart.container("anychart-container");
        chart.draw();

        document.getElementById('info-relatorio')!.innerHTML = `
            <p>Quantidade de empréstimos no período: <b>${relatorio.qtdEmprestimosPeriodo}</b></p>
            <p>Total do período: <b>${relatorio.valorTotalPeriodo}</b></p>
            <p>Média do período: <b>${relatorio.mediaPeriodo}</b></p>
        `; // montando as informações do período

        document.getElementById('mostrar-dados')?.addEventListener('click', e => {
            e.preventDefault();
            this.montarTabela(relatorio.emprestimosDoPeriodo);
        }); // configurando o click do botão para ele mostrar a tabela
    }

    montarTabela(emprestimos: RelatorioParaExibicao["emprestimosDoPeriodo"]) {
        const emprestimosEmHtml = emprestimos.map(e => {
            return `
                <tr>
                    <td>${e.indice}</td>
                    <td>${e.dataEmprestimo}</td>
                    <td>${formataValorParaReais(e.valor)}</td>
                </tr>
            `
        });
        document.getElementById('emprestimos-periodo')!.hidden = false;
        document.getElementById('mostrar-dados')!.hidden = true;
        document.getElementById('emprestimos-periodo')!.innerHTML = `
            <thead>
                <tr>
                    <th>#</th>
                    <th>Data</th>
                    <th>Total</th>
                <tr>
            </thead>
            <tbody>
                ${emprestimosEmHtml.join('\n')}
            </tbody>
        `;
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