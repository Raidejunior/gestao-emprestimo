export class Funcionario {

    static PERMISSAO_FUNCIONARIO = 1;
    static PERMISSAO_GERENTE = 2;

    id: number;
    login: string;
    email: string;
    permissao: number;

    constructor(id: number, login: string, email: string, permissao: number = Funcionario.PERMISSAO_FUNCIONARIO ) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.permissao = permissao;
    }

}