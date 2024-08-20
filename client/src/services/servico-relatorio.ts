import { API } from "../models/API";

export class ServicoRelatorio {

    async gerarRelatorio(dataInicio: string, dataTermino: string) {
        const resp = await fetch(API + `/relatorios?dataInicio=${dataInicio}&dataTermino=${dataTermino}`, { credentials: 'include' });
        const dados = await resp.json();

        if(resp.status === 400) {
            throw new Error(dados.mensagem);
        } else if(!resp.ok) {
            throw new Error(dados.mensagem);
        }

        console.log(dados);
    }

}