export class GerenciadorSessao {

    public setarLoginNaSessao(login: string): void {
        sessionStorage.setItem('usuarioLogin', login);
    }

    public obterLoginDaSessao(): string | null {
        return sessionStorage.getItem('usuarioLogin');
    }

    public limparSessao(): void {
        sessionStorage.removeItem('usuarioLogin');
    }
}
