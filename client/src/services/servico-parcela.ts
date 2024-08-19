import { API } from "../models/API.ts";
import { ParcelaParaListagem } from "../dto/ParcelaParaListagem.ts";

export class ServicoParcela {

    async buscarParcelasPorEmprestimoId(emprestimoId: string): Promise<ParcelaParaListagem[]> {
        const resp = await fetch(`${API}/parcelasDeIdEmprestimo?emprestimoId=${emprestimoId}`, { credentials: 'include' });

        console.log(resp.ok);

        if (!resp.ok) {
            throw new Error('Erro ao carregar parcelas');
        }

        const dados = await resp.json();

        if (!dados || dados.length === 0) {
            throw new Error('Nenhuma parcela encontrada');
        }



        let parcelas: ParcelaParaListagem[] = [];
        for (let dado of dados) {
            const [ano, mes, dia] = dado.vencimento.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;

            const parcela = new ParcelaParaListagem(
                Number(dado.id),
                Number(dado.numero),
                Number(dado.valor),
                dataFormatada,
                dado.status,
                Number(dado.emprestimo_id)
            );

            console.log(parcela);

            parcelas.push(parcela);
        }

        return parcelas;
    }

}
