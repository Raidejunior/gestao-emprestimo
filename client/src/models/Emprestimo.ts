import { Cliente } from "./Cliente"
import { FormaPagamento } from "./FormaPagamento"

const VALOR_MIN = 500;
const VALOR_MAX = 50000;

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

    static verificarValorEmprestimo(valor: number) {
        if(valor < VALOR_MIN || valor > VALOR_MAX) {
            return false;
        }
        return true;
    }
}