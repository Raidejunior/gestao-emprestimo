export class FormaPagamento{
    
    id: number;
    descricao: string
    meses: number
    juros: number

    constructor(id: number = 0, desc: string, meses: number, juros: number) {
        this.id = id
        this.descricao = desc;
        this.meses = meses;
        this.juros = juros;
    }
}