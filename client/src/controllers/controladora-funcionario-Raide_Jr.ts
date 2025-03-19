import { Funcionario } from "../models/Funcionario";
import { GerenciadorSessao } from "../utils/GerenciadorSessao";
import { VisaoFuncionario } from "../views/visao-funcionario";
import { ServicoFuncionario } from "../services/servico-funcionario";
import { AdicionarBtnInicio } from "../utils/AdicionarBtnInicio";

export class ControladoraFuncionario {

    visao: VisaoFuncionario;

    constructor(){
        this.visao = new VisaoFuncionario();
    }

    verificarPermissao() {
        const sessao = new GerenciadorSessao();
        const funcionario = sessao.obterFuncionarioDaSessao();

        if(funcionario != null && funcionario.permissao === Funcionario.PERMISSAO_GERENTE) { 
            return true;
        }

        return false;
    }

    configurarFuncionario(): void {
        AdicionarBtnInicio();
        this.visao.definirAcaoAoCadastrarFuncionario(this.enviarFormularioCadastroFuncionario.bind(this));
    }

    async enviarFormularioCadastroFuncionario(): Promise<void> {
        const funcionario = this.visao.obterDadosFormularioCadastro();
    
        // Validação do email
        if (!Funcionario.validaEmail(funcionario.email)) {
            this.visao.mostrarMensagemErro('Email inválido. Por favor, insira um email no formato correto.');
            return;
        }
    
        try {
            const servicoFuncionario = new ServicoFuncionario();
            const resposta = await servicoFuncionario.cadastrarFuncionario(funcionario);
    
            if (resposta.ok) {
                this.visao.mostrarMensagemSucesso('Funcionário cadastrado com sucesso.');
            }
        } catch (error: any) {
            this.visao.mostrarMensagemErro(`Erro ao cadastrar funcionário: ${error.message}`);
        }
    }    
}
