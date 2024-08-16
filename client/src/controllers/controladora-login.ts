import { ServicoLogin } from '../services/servico-login.ts';
import { VisaoLogin } from '../views/visao-login.ts';
import { GerenciadorSessao } from '../utils/GerenciadorSessao.ts';

export class ControladoraLogin {

    visao: VisaoLogin;
    gerenciadorSessao: GerenciadorSessao;

    constructor() {
        this.visao = new VisaoLogin();
        this.gerenciadorSessao = new GerenciadorSessao();
    }

    configurarLogin(): void {
        this.visao.definirAcaoAoEntrar(this.processarLogin.bind(this));
    }

    async processarLogin(): Promise<void> {
        const login = this.visao.login();
        const senha = this.visao.senha();
        const servicoLogin = new ServicoLogin();
        
        const autenticado = await servicoLogin.autenticar(login, senha);
        
        if (autenticado) {
            this.gerenciadorSessao.setarLoginNaSessao(login);
            window.location.hash = 'formulario-cliente'; // Redireciona para a próxima página
        } else {
            alert('Login ou senha inválidos');
        }
    }
}
