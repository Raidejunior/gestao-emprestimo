import { ClienteParaSessionStorage } from "../dto/ClienteParaSessionStorage";
import { FuncionarioParaSessionStorage } from "../dto/FuncionarioParaSessionStorage";

export class GerenciadorSessao {

    public setarFuncionarioNaSessao(funcionario: FuncionarioParaSessionStorage): void {
        sessionStorage.setItem('funcionario', JSON.stringify(funcionario));
    }

    public obterFuncionarioDaSessao(): FuncionarioParaSessionStorage | null {
        const dados =  JSON.parse(sessionStorage.getItem('funcionario')!);
        if(!dados) {
            return null;
        }
        
        return new FuncionarioParaSessionStorage(dados.login, dados.permissao);
    }

    public limparSessaoFuncionario(): void {
        if(this.obterFuncionarioDaSessao() != null) {
            sessionStorage.removeItem('funcionario');
        } 
    }

    public setarClienteNaSessao(cliente: ClienteParaSessionStorage): void {
        sessionStorage.setItem('cliente', JSON.stringify(cliente));
    }

    public obterClienteDaSessao(): ClienteParaSessionStorage | null {
        const dados =  JSON.parse(sessionStorage.getItem('cliente')!);
        if(!dados) {
            return null;
        }
        
        return new ClienteParaSessionStorage(dados.id, dados.nome, dados.dataNascimento, dados.limiteCredito, dados.limiteCreditoUtilizado, dados.limiteCreditoDisponivel);
    }

    public limparSessaoCliente(): void {
        if(this.obterFuncionarioDaSessao() != null) {
            sessionStorage.removeItem('cliente');
        } 
    }
}
