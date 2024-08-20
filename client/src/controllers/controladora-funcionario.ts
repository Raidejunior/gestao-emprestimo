import { Funcionario } from "../models/Funcionario";
import { GerenciadorSessao } from "../utils/GerenciadorSessao";
import { VisaoFuncionario } from "../views/visao-funcionario";
import { ServicoFuncionario } from "../services/servico-funcionario";

export class ControladoraFuncionario {

    visao: VisaoFuncionario;

    constructor(){
        this.visao = new VisaoFuncionario();
        this.configurarFuncionario();
    }

    verificarPermissao() {
        const sessao = new GerenciadorSessao();
        const funcionario = sessao.obterFuncionarioDaSessao();

        if(funcionario != null && funcionario.permissao === Funcionario.PERMISSAO_GERENTE) { 
            this.visao.adicionarOpcaoesGerente();
        }
    }

    configurarFuncionario(): void {
        this.visao.definirAcaoAoCadastrarFuncionario(this.enviarFormularioCadastroFuncionario.bind(this));
    }

    async enviarFormularioCadastroFuncionario(): Promise<void> {
        const funcionario = this.visao.obterDadosFormularioCadastro();

        try {
            const servicoFuncionario = new ServicoFuncionario();
            const resposta = await servicoFuncionario.cadastrarFuncionario(funcionario);

            if (resposta.ok) {
                this.visao.mostrarMensagemSucesso('Funcionario cadastrado com sucesso.');
            } else {
                const erro = await resposta.json();
                this.visao.mostrarMensagemErro(`Erro ao cadastrar funcionario: ${erro.mensagem}`);
            }
        } catch (error: any) {
            this.visao.mostrarMensagemErro(`Erro ao conectar ao servidor: ${error.message}`);
        }
    }
}
