export class Parcela {
    numero: number
    vencimento: Date
    valor: number

    constructor(numero: number, vencimento: Date, valor: number) {
        this.numero = numero;
        this.vencimento = vencimento;
        this.valor = valor;
    }
}