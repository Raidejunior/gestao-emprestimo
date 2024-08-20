export class FuncionarioParaCadastro {

    static PERMISSAO_FUNCIONARIO = 1;
    static PERMISSAO_GERENTE = 2;

    nome: string;
    login: string;
    email: string;
    senha: string;
    permissao: number;

    constructor(nome: string, login: string, email: string, senha: string, permissao: number = FuncionarioParaCadastro.PERMISSAO_FUNCIONARIO) {
        this.nome = nome;
        this.login = login;
        this.email = email;
        this.senha = senha;
        this.permissao = permissao;
    }

}