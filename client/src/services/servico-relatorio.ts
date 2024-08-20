import { RelatorioParaExibicao } from "../dto/RelatorioParaExibicao";
import { API } from "../models/API";

export class ServicoRelatorio {

    async gerarRelatorio(dataInicio: string, dataTermino: string): Promise<RelatorioParaExibicao> {
        const resp = await fetch(API + `/relatorios?dataInicio=${dataInicio}&dataTermino=${dataTermino}`, { credentials: 'include' });
        const dados = await resp.json();

        if(resp.status === 400) {
            throw new Error(dados.mensagem);
        } else if(!resp.ok) {
            throw new Error(dados.mensagem);
        }

        return new RelatorioParaExibicao(dados.qtdEmprestimosPeriodo, dados.valorTotalPeriodo, dados.mediaPeriodo, 
            dados.emprestimosDoPeriodo, dados.dadosDosDias
        );
    }

}