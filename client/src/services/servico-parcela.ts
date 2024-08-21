import { API } from "../models/API.ts";
import { ParcelaParaListagem } from "../dto/ParcelaParaListagem.ts";

export class ServicoParcela {

    async buscarParcelasPorEmprestimoId(emprestimoId: string): Promise<ParcelaParaListagem[]> {
        const resp = await fetch(`${API}/emprestimos/${emprestimoId}/parcelas`, { credentials: 'include' });

        if (!resp.ok) {
            throw new Error('Erro ao carregar parcelas');
        }

        const dados = await resp.json();

        if (!dados || dados.length === 0) {
            throw new Error('Nenhuma parcela encontrada');
        }

        let parcelas: ParcelaParaListagem[] = [];
        for (let dado of dados) {
            const [ano, mes, dia] = dado.dataVencimento.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;

            const parcela = new ParcelaParaListagem(
                Number(dado.id),
                Number(dado.numeroParcela),
                Number(dado.valorParcela),
                dataFormatada,
                dado.status,
                dado.dataPagamento ? dado.dataPagamento : '-',
                dado.funcionarioQueConfirmouPg ? dado.funcionarioQueConfirmouPg : '-',
                dado.idEmprestimo
            );

            parcelas.push(parcela);
        }

        return parcelas;
    }

    async pagarParcelasPorEmprestimoId(emprestimoId: Number, parcelaId: Number): Promise<Boolean> {
        const ids = { // Por ser apenas para enviar emrpestimoId e parcelaId para a API, não é necessário criar uma DTO apenas para essa finalidade.
            emprestimoId: emprestimoId,
            parcelaId: parcelaId
        };
        
        const resp = await fetch(API + `/parcelas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids),
            credentials: "include"
        });

        if (!resp.ok) {
            throw new Error('Erro ao realizar pagamento da parcela');
        }
        
        return true;
    }
}
