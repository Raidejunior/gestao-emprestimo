import { ServicoAutenticacao } from '../services/servico-autenticacao.ts';
import { VisaoAutenticacao } from '../views/visao-autenticacao.ts';
import { GerenciadorSessao } from '../utils/GerenciadorSessao.ts';
import { FuncionarioParaSessionStorage } from '../dto/FuncionarioParaSessionStorage.ts';

export class ControladoraAutenticacao {

    visao: VisaoAutenticacao;
    gerenciadorSessao: GerenciadorSessao;
    servicoAutenticacao: ServicoAutenticacao;

    constructor() {
        this.visao = new VisaoAutenticacao();
        this.gerenciadorSessao = new GerenciadorSessao();
        this.gerenciadorSessao.limparSessaoFuncionario();
        this.servicoAutenticacao = new ServicoAutenticacao();
    }

    configurarLogin(): void {
        this.visao.definirHash(); // ajustando o hash da página, pois a página de login é usada como uma página de redirect
        this.visao.definirAcaoAoEntrar(this.processarLogin.bind(this));
    }

    async processarLogin(): Promise<void> {
        const login = this.visao.login();
        let senha = this.visao.senha();
        
        const funcionario = await this.servicoAutenticacao.autenticar(login, senha);
        senha = ''; // garantindo que a senha não fique salva na variável
        
        if (funcionario instanceof FuncionarioParaSessionStorage) {
            this.gerenciadorSessao.setarFuncionarioNaSessao(funcionario);
            window.location.hash = 'home'; // Redireciona para a próxima página
        } else {
            alert('Login ou senha inválidos');
        }
    }

    deslogar(): void {
        this.servicoAutenticacao.deslogar();
        this.visao.definirHash(); // ajustando o hash da página, pois a página de login é usada como uma página de redirect
    }

}
