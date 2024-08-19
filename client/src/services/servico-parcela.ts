import { API } from "../models/API.ts";
import { ParcelaParaListagem } from "../dto/ParcelaParaListagem.ts";
import { Parcela } from "../models/Parcela.ts";

export class ServicoParcela {

    async buscarParcelasPorEmprestimoId(emprestimoId: number): Promise<Parcela[]> {
        const resp = await fetch(`${API}/emprestimos/${emprestimoId}/parcelas`, { credentials: 'include' });

        if (!resp.ok) {
            throw new Error('Erro ao carregar parcelas');
        }

        const dados: ParcelaParaListagem[] = await resp.json();

        if (!dados || dados.length === 0) {
            throw new Error('Nenhuma parcela encontrada');
        }

        let parcelas: Parcela[] = [];
        for (let dado of dados) {
            const [ano, mes, dia] = dado.data_vencimento.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;
            const dataVencimento = new Date(dataFormatada);

            const parcela = new Parcela(
                Number(dado.numero_parcela),
                dataVencimento,
                Number(dado.valor_parcela),
            );

            parcelas.push(parcela);
        }

        return parcelas;
    }

}
