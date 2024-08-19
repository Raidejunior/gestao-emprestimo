export class ParcelaParaListagem {
    id: number;
    numero_parcela: number;
    valor_parcela: number;
    data_vencimento: Date | String;
    status: string;
    id_emprestimo: number;

    constructor(id: number, numero_parcela: number, valor_parcela: number, data_vencimento: Date | String, status: string, id_emprestimo: number) {
        this.id = id;
        this.numero_parcela = numero_parcela;
        this.valor_parcela = valor_parcela;
        this.data_vencimento = data_vencimento;
        this.status = status;
        this.id_emprestimo = id_emprestimo;
    }
}
