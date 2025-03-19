import { Cliente } from '../models/Cliente';
import { GerenciadorSessao } from '../utils/GerenciadorSessao.ts';

export class ValidarCliente {
    private readonly LIMITE_CREDITO_MAXIMO = 50000;
    private readonly LIMITE_CREDITO_MINIMO = 500;

    sessao: GerenciadorSessao;

    constructor(){
        this.sessao = new GerenciadorSessao();
    }

    validarCPF(cpf: string): boolean {
        if(!Cliente.isCPFValido(cpf)) {
            this.sessao.limparSessaoCliente();
            throw new Error('CPF inválido!');
        }

        return true;
    }

    validarDataNascimento(dataNascimento: Date | string): boolean {
        const cliente = new Cliente(0, '', '', dataNascimento);
        if(!cliente.isDataNascimentoPreenchida()) {
            this.sessao.limparSessaoCliente();
            throw new Error('Data de Nascimento inválida!');
        }

        return true;
    }

    validarLimiteCredito(limiteCredito: number): boolean {
        if (limiteCredito < 0 || limiteCredito > this.LIMITE_CREDITO_MAXIMO || limiteCredito < this.LIMITE_CREDITO_MINIMO) {
            this.sessao.limparSessaoCliente();
            throw new Error('Limite de Credito inválido!');
        }
        
        return true;
    }

    validarCliente(cliente: Cliente): boolean {
        const cpfValido = this.validarCPF(cliente.cpf);
        const dataNascimentoValida = this.validarDataNascimento(cliente.dataNascimento);
        const limiteCreditoValido = this.validarLimiteCredito(Number(cliente.limiteCredito));

        if (!cpfValido) {
            this.sessao.limparSessaoCliente();
            throw new Error('CPF inválido!');
        }

        if (!dataNascimentoValida) {
            this.sessao.limparSessaoCliente();
            throw new Error('Data de Nascimento inválida!');
        }

        if (!limiteCreditoValido) {
            this.sessao.limparSessaoCliente();
            throw new Error('Limite de Credito inválido!');
        }

        return true; // Se todas as validações passarem
    }
}
