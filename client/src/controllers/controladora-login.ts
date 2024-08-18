import { ServicoLogin } from '../services/servico-login.ts';
import { VisaoLogin } from '../views/visao-login.ts';
import { GerenciadorSessao } from '../utils/GerenciadorSessao.ts';
import { FuncionarioParaSessionStorage } from '../dto/FuncionarioParaSessionStorage.ts';

export class ControladoraLogin {

    visao: VisaoLogin;
    gerenciadorSessao: GerenciadorSessao;

    constructor() {
        this.visao = new VisaoLogin();
        this.gerenciadorSessao = new GerenciadorSessao();
        this.gerenciadorSessao.limparSessao();
    }

    configurarLogin(): void {
        this.visao.definirHash(); // ajustando o hash da página, pois a página de login é usada como uma página de redirect
        this.visao.definirAcaoAoEntrar(this.processarLogin.bind(this));
    }

    async processarLogin(): Promise<void> {
        const login = this.visao.login();
        let senha = this.visao.senha();
        const servicoLogin = new ServicoLogin();
        
        const funcionario = await servicoLogin.autenticar(login, senha);
        senha = ''; // garantindo que a senha não fique salva na variável
        
        if (funcionario instanceof FuncionarioParaSessionStorage) {
            this.gerenciadorSessao.setarFuncionarioNaSessao(funcionario);
            window.location.hash = 'home'; // Redireciona para a próxima página
        } else {
            alert('Login ou senha inválidos');
        }
    }
}
