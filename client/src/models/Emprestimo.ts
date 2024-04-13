import { Cliente } from "./Cliente"
import { FormaPagamento } from "./FormaPagamento"

export class Emprestimo {
    
    cliente: Cliente;
    valorEmprestimo: number;
    formaPagamento: FormaPagamento;
    dataHora: Date;

    constructor(cliente: Cliente, valorEmp: number, formaPag: FormaPagamento, dataHora: Date) {
        this.cliente = cliente;
        this.valorEmprestimo = valorEmp;
        this.formaPagamento = formaPag;
        this.dataHora = dataHora;
    }
}