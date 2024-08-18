import { Funcionario } from "../models/Funcionario.ts";
import { GerenciadorSessao } from "../utils/GerenciadorSessao.ts";
import { VisaoRotas } from "../views/visao-rotas.ts";
import { ControladoraCliente } from "./controladora-cliente.ts";
import { ControladoraFuncionario } from "./controladora-funcionario.ts";
import { ControladoraLogin } from "./controladora-login.ts";

export class ControladoraRotas {

    visao: VisaoRotas;

    constructor() {
        this.visao = new VisaoRotas();
    }

    async carregarRota() {
        const hash = this.visao.hash();

        switch(hash) {
            case 'home':
                if(! this.verificarFuncionarioLogado()) {
                    this.redirecionarParaLogin();
                    break;
                }
                await this.carregarConteudo('home');
                let controlFuncionario = new ControladoraFuncionario();
                controlFuncionario.verificarPermissao(); // verificando a permissão para saber se o usuário pode ter acesso aos relatórios
                break;
            case 'formulario-emprestimo':
                if(! this.verificarFuncionarioLogado()) {
                    this.redirecionarParaLogin();
                    break;
                }
                await this.carregarConteudo('form-emprestimo');
                let controlCliente = new ControladoraCliente();
                controlCliente.configurarBusca();
                break;
            default:
                await this.carregarConteudo('login');
                let controlLogin = new ControladoraLogin();
                controlLogin.configurarLogin();
        }
    }
    
    verificarFuncionarioLogado(verificarPermissao: boolean = false): boolean {
        const sessao = new GerenciadorSessao();
        const funcionario = sessao.obterFuncionarioDaSessao();

        if(!funcionario) {
            return false;
        }

        if(verificarPermissao) {
            return funcionario.permissao === Funcionario.PERMISSAO_GERENTE 
        }

        return true;

    }

    async carregarConteudo(pagina: string) {
        const resp = await fetch(`../../pages/${pagina}.html`);
        const html = await resp.text();
        this.visao.carregarConteudo(html);
    }

    async redirecionarParaLogin() {
        await this.carregarConteudo('login');
        let controlLogin = new ControladoraLogin();
        controlLogin.configurarLogin();
    }

    configurarRotas(): void {
        this.visao.definiarAcaoAoTrocarHash(this.carregarRota.bind(this));
    }
}