export class ParcelaParaListagem {
    numero_parcela: number;
    valor_parcela: number;
    data_vencimento: string;
    status: string;

    constructor(numero_parcela: number, valor_parcela: number, data_vencimento: string, status: string) {
        this.numero_parcela = numero_parcela;
        this.valor_parcela = valor_parcela;
        this.data_vencimento = data_vencimento;
        this.status = status;
    }
}
