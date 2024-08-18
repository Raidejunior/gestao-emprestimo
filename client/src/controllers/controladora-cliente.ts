import { Cliente } from '../models/Cliente.ts';
import { ServicoCliente } from '../services/servico-cliente.ts';
import { VisaoCliente } from '../views/visao-cliente.ts';
import { ControladoraEmprestimo } from './controladora-emprestimo.ts';

export class ControladoraCliente {

    visao: VisaoCliente;

    constructor(){
        this.visao = new VisaoCliente();
    }

    /**
    * Responsável por chamar método na visao para definir qual ação será feita quando solicitado para buscar cliente por cpf.
    */
    configurarBusca(): void {
        this.visao.definirAcaoAoBuscar(this.buscar.bind(this));
    }

    /**
    * Responsável por chamar service para localizar cliente, salvá-lo em sessão e 
    * chamar controller para iniciar a configuração do formulário.
    */
    async buscar(): Promise<void> {
        const cpf = this.visao.cpf(Cliente.desformataCPF);
        const servicoCliente = new ServicoCliente();

        try {
            if(!Cliente.isCPFValido(cpf)) {
                Cliente.salvarClienteSessionStorage(null);
                throw new Error('CPF inválido!');
            }
            
            const cliente = await servicoCliente.localizarCliente(cpf);
            Cliente.salvarClienteSessionStorage(cliente);
            
            const nome = cliente.nome;
            const idade = cliente.getIdade();
            const controlEmprestimo = new ControladoraEmprestimo();
            controlEmprestimo.configurarFormulario(nome, idade);

        } catch(e: any) {
            this.visao.mostrarResultado(e.message);
        }
    }
}