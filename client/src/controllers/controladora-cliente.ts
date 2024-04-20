import { Cliente } from '../models/Cliente.ts';
import { ServicoCliente } from '../services/servico-cliente.ts';
import { VisaoCliente } from '../views/visao-cliente.ts';
import { ControladoraEmprestimo } from './controladora-emprestimo.ts';

export class ControladoraCliente {

    visao: VisaoCliente;

    constructor(){
        this.visao = new VisaoCliente();
    }

    configurarBusca(): void {
        this.visao.definirAcaoAoBuscar(this.buscar.bind(this));
    }

    async buscar(): Promise<void> {
        const cpf = this.visao.cpf();
        const servicoCliente = new ServicoCliente();

        try {
            if(!Cliente.isCPFValido(cpf)) {
                Cliente.salvarClienteSessionStorage(null);
                throw new Error('CPF inválido!');
            }
            
            const cliente = await servicoCliente.localizarCliente(cpf);
            Cliente.salvarClienteSessionStorage(cliente);
            
            this.visao.mostrarResultado(`${cliente.formataMensagem()}`);

            const controlEmprestimo = new ControladoraEmprestimo();
            controlEmprestimo.configurarFormulario();

        } catch(e: any) {
            this.visao.mostrarResultado(e.message);
        }
    }
}