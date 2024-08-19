import { Funcionario } from "../models/Funcionario.ts";
import { GerenciadorSessao } from "../utils/GerenciadorSessao.ts";
import { VisaoRotas } from "../views/visao-rotas.ts";
import { ControladoraCliente } from "./controladora-cliente.ts";
import { ControladoraEmprestimo } from "./controladora-emprestimo.ts";
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
            case 'cadastro-cliente':
                if(! this.verificarFuncionarioLogado()) {
                    this.redirecionarParaLogin();
                    break;
                }
                await this.carregarConteudo('form-cliente');
                let controlClienteConfigEnvioFormulario = new ControladoraCliente();
                controlClienteConfigEnvioFormulario.configurarEnvioFormulario();
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
            case 'emprestimos':
                if(! this.verificarFuncionarioLogado()) {
                    this.redirecionarParaLogin();
                    break;
                }
                let controlEmprestimo = new ControladoraEmprestimo();
                controlEmprestimo.buscarTodosEmprestimos();
                break;               
            case 'cadastro-funcionario':
                if(! this.verificarFuncionarioLogado(true)) {
                    this.redirecionarParaLogin();
                    break;
                }
                await this.carregarConteudo('form-funcionario')
                break;
            default:
                await this.carregarConteudo('login');
                let controlLogin = new ControladoraLogin();
                controlLogin.configurarLogin();
        }
    }
    
    verificarFuncionarioLogado(verificarSeEhGerente: boolean = false): boolean {
        const sessao = new GerenciadorSessao();
        const funcionario = sessao.obterFuncionarioDaSessao();

        if(!funcionario) {
            return false;
        }

        if(verificarSeEhGerente) {
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