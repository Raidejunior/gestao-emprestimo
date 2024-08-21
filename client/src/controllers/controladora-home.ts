import { VisaoHome } from "../views/visao-home";
import { ControladoraAutenticacao } from "./controladora-autenticacao";
import { ControladoraFuncionario } from "./controladora-funcionario";

export class ControladoraHome {

    visao: VisaoHome;

    constructor() {
        this.visao = new VisaoHome();
    }

    configurarHome() {
        this.visao.definirAcaoAoSair(this.deslogar.bind(this));

        this.configurarAcessoHome();
    }

    private configurarAcessoHome() {

        let controlFuncionario = new ControladoraFuncionario();
        const gerente = controlFuncionario.verificarPermissao(); // verificando a permissão para saber o conteúdo que o usuário pode ter acesso

        if(gerente) { 
            this.visao.adicionarOpcaoesGerente();
        }
    }

    private deslogar() {
        try{
            let controlAutenticacao = new ControladoraAutenticacao();
            controlAutenticacao.deslogar();
        } catch (erro) {
            console.error(erro);
            this.visao.mostrarMensagemErro('Erro ao deslogar funcionario. Tente novamente.');
        }
    }

}