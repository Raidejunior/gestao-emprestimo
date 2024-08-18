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

    public limparSessao(): void {
        if(this.obterFuncionarioDaSessao() != null) {
            sessionStorage.removeItem('funcionario');
        } 
    }
}
