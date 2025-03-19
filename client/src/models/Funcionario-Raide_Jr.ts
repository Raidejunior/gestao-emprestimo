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

    static verificaPermissaoValida(permissao: any) {
        if(permissao !== Funcionario.PERMISSAO_FUNCIONARIO && permissao !== Funcionario.PERMISSAO_GERENTE) {
            return false;
        }
        return true;
    }   

    static validaEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o formato do email
        return emailRegex.test(email);
    }
}