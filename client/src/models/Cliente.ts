export const TAM_CPF = 11;

export class Cliente {

    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    limiteCredito: number;
    limiteCreditoUtilizado: number;
    limiteCreditoDisponivel: number;

    constructor(id: number = 0, nome: string = '', cpf: string = '', dataNascimento: Date | string = '', limiteCredito: number = 0,
        limiteCreditoUtilizado: number = 0, limiteCreditoDisponivel: number= 0) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = this.converterData(dataNascimento);
        this.limiteCredito = limiteCredito;
        this.limiteCreditoUtilizado = limiteCreditoUtilizado;
        this.limiteCreditoDisponivel = limiteCreditoDisponivel;
    }


    static isCPFValido(cpf: string): boolean | string {

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
    
        return cpf; // O CPF está preenchido e válido
    }

    static desformataCPF(cpf: string): string {
        const isCPFFormatado = Cliente.isCPFFormatado(cpf);
        if(isCPFFormatado)
            return cpf.replace(/\D/g, '');
        else
            return cpf;
    }

    static isCPFFormatado(cpf: string): boolean {
        if(cpf.length == 14)
            return true;
        else
            return false;
    }

    static salvarClienteSessionStorage(cliente: Cliente | null) {
        sessionStorage.setItem('cliente', JSON.stringify(cliente));
    }

    isDataNascimentoPreenchida(): boolean {
        // Verifica se a data de nascimento é null ou undefined ou vazia
        if (this.dataNascimento === null || this.dataNascimento === undefined || this.dataNascimento.toString() == '') {
            return false;
        }
        
        // Verifica se a data de nascimento é uma instância de Date válida
        if (!(this.dataNascimento instanceof Date) || isNaN(this.dataNascimento.getTime())) {
            return false;
        }
    
        return true; // A data de nascimento está preenchida e é válida
    }

    getIdade(dataAtual?: Date | string): number {
        let hoje = new Date();
        if(dataAtual) {
            hoje = this.converterData(dataAtual); // Uma data qualquer pode ser passada como argumento para representar o dia atual
        }

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

    converterData(data: Date | string): Date {
        if(data === '') {
            return new Date();
        }

        if(data instanceof Date) {
            return data;
        }

        const partes = data.split('-');
        const ano = Number(partes[0]);
        const mes = Number(partes[1]) - 1;
        const dia = Number(partes[2]);
        
        return new Date(ano, mes, dia);
    }   

}
