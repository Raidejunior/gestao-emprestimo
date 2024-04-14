import { Cliente } from '../models/Cliente.ts';
import { VisaoCliente } from '../views/visao-cliente.ts';

export class ControladoraCliente {

    visao: VisaoCliente;

    constructor(){
        this.visao = new VisaoCliente();
    }

    configurarBusca(): void {
        this.visao.definirAcaoAoBuscar(this.buscar.bind(this));
    }

    async buscar() {
        const cpf = this.visao.cpf();
        const c = new Cliente({nome: '', cpf, dataNascimento: new Date()});

        try {
            const cliente = await c.localizarCliente();
            this.visao.mostrarResultado(`${cliente.formataMensagem()}`);

        } catch(e: any) {
            this.visao.mostrarResultado(e.message);
        }
    }
}