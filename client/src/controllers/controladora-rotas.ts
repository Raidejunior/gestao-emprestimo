import { VisaoRotas } from "../views/visao-rotas.ts";
import { ControladoraCliente } from "./controladora-cliente.ts";
import { ControladoraEmprestimo } from "./controladora-emprestimo.ts";

export class ControladoraRotas {

    visao: VisaoRotas;

    constructor() {
        this.visao = new VisaoRotas();
    }

    async carregarRota() {
        const hash = this.visao.hash();

        switch(hash) {
            case 'formulario-cliente':
                let controlCliente = new ControladoraCliente();
                controlCliente.configurarBusca();
                this.carregarConteudo('form-cliente');
                break;
            case 'formulario-emprestimo':
                const controlEmprestimo = new ControladoraEmprestimo();
                this.carregarConteudo('form-emprestimo');
                controlEmprestimo.configurarFormulario('a', 13);
                break;
            default:
                this.carregarConteudo('login');
        }
    }
    
    async carregarConteudo(pagina: string) {
        const resp = await fetch(`../../pages/${pagina}.html`);
        const html = await resp.text();
        console.log(html);
        this.visao.carregarConteudo(html);
    }

    configurarRotas(): void {
        this.visao.definiarAcaoAoTrocarHash(this.carregarRota.bind(this));
    }
}