import { VisaoRotas } from "../views/visao-rotas.ts";
import { ControladoraCliente } from "./controladora-cliente.ts";
import { ControladoraEmprestimo } from "./controladora-emprestimo.ts";
import { ControladoraLogin } from "./controladora-login.ts";

export class ControladoraRotas {

    visao: VisaoRotas;

    constructor() {
        this.visao = new VisaoRotas();
    }

    async carregarRota() {
        const hash = this.visao.hash();

        switch(hash) {
            case 'formulario-cliente':
                await this.carregarConteudo('form-cliente');
                let controlCliente = new ControladoraCliente();
                controlCliente.configurarBusca();
                
                break;
            case 'formulario-emprestimo':
                await this.carregarConteudo('form-emprestimo');
                const controlEmprestimo = new ControladoraEmprestimo();
                controlEmprestimo.configurarFormulario('a', 13);
                break;
            default:
                await this.carregarConteudo('login');
                let controlLogin = new ControladoraLogin();
                controlLogin.configurarLogin();
        }
    }
    
    async carregarConteudo(pagina: string) {
        const resp = await fetch(`../../pages/${pagina}.html`);
        const html = await resp.text();
        //console.log(html);
        this.visao.carregarConteudo(html);
    }

    configurarRotas(): void {
        this.visao.definiarAcaoAoTrocarHash(this.carregarRota.bind(this));
    }
}