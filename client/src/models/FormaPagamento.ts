export class FormaPagamento{
    
    id: number;
    descricao: string
    numMeses: number
    juros: number

    constructor(id: number = 0, desc: string, numMeses: number, juros: number) {
        this.id = id
        this.descricao = desc;
        this.numMeses = numMeses;
        this.juros = juros;
    }
}