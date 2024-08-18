export class FuncionarioParaSessionStorage {

    login: string;
    permissao: Number;

    constructor(login: string, permissao: Number) {
        this.login = login;
        this.permissao = permissao;
    }
} 