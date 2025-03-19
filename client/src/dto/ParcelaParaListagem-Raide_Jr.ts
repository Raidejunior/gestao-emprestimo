export class ParcelaParaListagem {
    id: number;
    numeroParcela: number;
    valorParcela: number;
    dataVencimento: string | null;
    status: string;
    dataPagamento: Date | string;
    funcionarioQueConfirmouPg: string;
    idEmprestimo: number;
    
    constructor(id: number, numeroParcela: number, valorParcela: number, dataVencimento: string | null, status: string,
        dataPagamento: Date | string, funcConfPagamento: string, IdEmprestimo: number) {
        this.id = id;
        this.numeroParcela = numeroParcela;
        this.valorParcela = valorParcela;
        this.dataVencimento = dataVencimento;
        this.status = status;
        this.dataPagamento = dataPagamento;
        this.funcionarioQueConfirmouPg = funcConfPagamento;
        this.idEmprestimo = IdEmprestimo;
    }
}
