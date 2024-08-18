import { Funcionario } from "../models/Funcionario";
import { GerenciadorSessao } from "../utils/GerenciadorSessao";
import { VisaoFuncionario } from "../views/visao-funcionario";

export class ControladoraFuncionario {

    visao: VisaoFuncionario;

    constructor(){
        this.visao = new VisaoFuncionario();
    }

    verificarPermissao() {
        const sessao = new GerenciadorSessao();
        const funcionario = sessao.obterFuncionarioDaSessao();

        if(funcionario != null && funcionario.permissao === Funcionario.PERMISSAO_GERENTE) { // caso o funcionario for um gerente, a opção de acesso ao relatório é adicionada
            this.visao.adicionarOpcaoRelatorio();
        }
    }

}