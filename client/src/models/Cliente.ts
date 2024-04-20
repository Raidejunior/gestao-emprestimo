export const TAM_CPF = 11;

export class Cliente {

    nome: string;
    cpf: string;
    dataNascimento: Date;

    constructor(nome: string, cpf: string, dataNascimento: Date | string ) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = this.converterData(dataNascimento);
    }


    static isCPFValido(cpf: string): boolean {

        // Verifica se o CPF está preenchido
        if (cpf === null || cpf === undefined || cpf.trim() === '') {
            return false;
        }

        // Remove caracteres não numéricos do CPF
        cpf = cpf.replace(/\D/g, '');
    
        // Verifica se o CPF possui 11 dígitos
        if (cpf.length !== TAM_CPF) {
            return false;
        }

        // Verifica se todos os dígitos do CPF são iguais
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
    
        return true; // O CPF está preenchido e válido
    }

    static salvarClienteSessionStorage(cliente: Cliente | null) {
        sessionStorage.setItem('cliente', JSON.stringify(cliente));
    }

    isDataNascimentoPreenchida(): boolean {
        // Verifica se a data de nascimento é null ou undefined
        if (this.dataNascimento === null || this.dataNascimento === undefined) {
            return false;
        }
        
        // Verifica se a data de nascimento é uma instância de Date válida
        if (!(this.dataNascimento instanceof Date) || isNaN(this.dataNascimento.getTime())) {
            return false;
        }
    
        return true; // A data de nascimento está preenchida e é válida
    }

    getIdade(): number {
        const hoje = new Date();
        let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
        const mesAtual = hoje.getMonth() + 1; // Os meses começam a partir de zero
        const mesNascimento = this.dataNascimento.getMonth() + 1;
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < this.dataNascimento.getDate())) {
            idade--; // Ainda não fez aniversário este ano
        }
        return idade;
    }

    formataMensagem(): string {
        const idade = this.getIdade();
        const mensagem = `${this.nome}, ${idade} anos`;
        return mensagem;
    }

    converterData(data: any): Date {
        const partes = data.split('-');
        const ano = partes[0];
        const mes = partes[1] - 1;
        const dia = partes[2];
        
        console.log('ano: ', ano, mes, dia);
        console.log(new Date(ano, mes, dia));
        return new Date(ano, mes, dia);
    }   

}
