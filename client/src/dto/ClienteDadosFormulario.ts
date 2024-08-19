export class ClienteDTO {
    nome: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
    email: string;
    endereco: string;
    limiteCredito: string;

    constructor(
        nome: string,
        cpf: string,
        dataNascimento: string,
        telefone: string,
        email: string,
        endereco: string,
        limiteCredito: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
        this.limiteCredito = limiteCredito;
    }
}