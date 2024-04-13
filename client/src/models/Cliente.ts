export const TAM_CPF = 11;

export class Cliente {

    nome: string;
    cpf: string;
    dataNascimento: Date;

    constructor(nome: string, cpf: string, dataNascimento: Date) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    validarCPF() : boolean {
        
        if(this.cpf.length !== TAM_CPF || isNaN(Number(this.cpf))) {
            return false;
        }
    
        return true;
    }

}
