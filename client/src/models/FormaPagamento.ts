export class FormaPagamento{
    
    descricao: string
    numMeses: number
    juros: number

    constructor(desc: string, numMeses: number, juros: number) {
        this.descricao = desc;
        this.numMeses = numMeses;
        this.juros = juros;
    }
}