export class Funcionario {

    static PERMISSAO_FUNCIONARIO = 1;
    static PERMISSAO_GERENTE = 2;

    id: number | undefined;
    nome: string;
    login: string;
    email: string;
    permissao: number;

    constructor(nome: string, login: string, email: string, permissao: number = Funcionario.PERMISSAO_FUNCIONARIO, id?: number) {
        this.nome = nome;
        this.login = login;
        this.email = email;
        this.permissao = permissao;
        this.id = id;
    }

}