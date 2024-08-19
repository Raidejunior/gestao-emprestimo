export class ClienteParaSessionStorage {

    id: Number;
    nome: string;
    dataNascimento: Date;
    limiteCredito: Number;
    limiteCreditoUtilizado: Number;
    limiteCreditoDisponivel: Number;

    constructor(id: Number, nome: string, dataNascimento: Date, limiteCredito: Number, limiteCreditoUtilizado: Number, limiteCreditoDisponivel: Number) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.limiteCredito = limiteCredito;
        this.limiteCreditoUtilizado = limiteCreditoUtilizado;
        this.limiteCreditoDisponivel = limiteCreditoDisponivel;
    }
} 