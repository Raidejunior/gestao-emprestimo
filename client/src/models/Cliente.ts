export const TAM_CPF = 11;
const API = 'http://localhost:8080';

export class Cliente {

    nome: string;
    cpf: string;
    dataNascimento: Date;

    constructor(cliente = { nome: '', cpf: '', dataNascimento: new Date() }) {
        this.nome = cliente.nome;
        this.cpf = cliente.cpf;
        this.dataNascimento = cliente.dataNascimento;
    }


    isCPFValido(): boolean {
        // Verifica se o CPF está preenchido
        if (this.cpf === null || this.cpf === undefined || this.cpf.trim() === '') {
            return false;
        }
    
        // Remove caracteres não numéricos do CPF
        this.cpf = this.cpf.replace(/\D/g, '');
    
        // Verifica se o CPF possui 11 dígitos
        if (this.cpf.length !== TAM_CPF) {
            return false;
        }
    
        // Verifica se todos os dígitos do CPF são iguais
        if (/^(\d)\1+$/.test(this.cpf)) {
            return false;
        }
    
        return true; // O CPF está preenchido e válido
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


    async localizarCliente(): Promise<Cliente> {
        
        if(!this.isCPFValido()) {
            throw new Error('CPF inválido!');
        }

        const resp = await fetch(API + `/clientes?cpf=${this.cpf}`);

        if(!resp.ok) {
            throw new Error('Erro ao buscar cliente');
        }

        const dados = await resp.json();
        if(dados.length < 1) {
            throw new Error('Nenhum cliente foi encontrado');
        }

        const [cliente] = dados;

        return new Cliente({ nome: cliente.nome, cpf: cliente.cpf, 
            dataNascimento: cliente.dataNascimento } );

    }   

}
