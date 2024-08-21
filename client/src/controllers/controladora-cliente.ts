import { ClienteParaSessionStorage } from '../dto/ClienteParaSessionStorage.ts';
import { Cliente } from '../models/Cliente.ts';
import { ServicoCliente } from '../services/servico-cliente.ts';
import { GerenciadorSessao } from '../utils/GerenciadorSessao.ts';
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
        const sessao = new GerenciadorSessao();

        try {
            if(!Cliente.isCPFValido(cpf)) {
                sessao.limparSessaoCliente();
                throw new Error('CPF inválido!');
            }
            
            const cliente = await servicoCliente.localizarCliente(cpf);

            const controlEmprestimo = new ControladoraEmprestimo();
            controlEmprestimo.configurarFormulario(cliente.nome, cliente.getIdade(), cliente.limiteCredito, cliente.limiteCreditoDisponivel, cliente.limiteCreditoUtilizado);

            const clienteParaSessao = new ClienteParaSessionStorage(cliente.id, cliente.nome, cliente.dataNascimento, cliente.limiteCredito, 
                cliente.limiteCreditoUtilizado, cliente.limiteCreditoDisponivel);
            sessao.setarClienteNaSessao(clienteParaSessao); // salvando cliente na session storage

        } catch(e: any) {
            this.visao.mostrarResultado(e.message);
        }
    }

    configurarEnvioFormulario(): void {
        this.visao.definirAcaoAoEnviar(this.enviarFormularioCliente.bind(this));
    }

    async enviarFormularioCliente(): Promise<void> {
        const cliente = this.visao.obterDadosFormulario();

        try {
            const servicoCliente = new ServicoCliente();
            const resposta = await servicoCliente.cadastrarCliente(cliente);

            if (resposta.sucesso) {
                this.visao.mostrarMensagemSucesso('Cliente cadastrado com sucesso.');
            } else {
                this.visao.mostrarMensagemErro(`Erro ao cadastrar cliente: ${resposta.mensagem}`);
            }
        } catch (error: any) {
            this.visao.mostrarMensagemErro(`Erro ao conectar ao servidor: ${error.message}`);
        }
    }
}
