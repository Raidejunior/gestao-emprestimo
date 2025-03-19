import { ServicoRelatorio } from "../services/servico-relatorio";
import { AdicionarBtnInicio } from "../utils/AdicionarBtnInicio";
import { VisaoRelatorio } from "../views/view-relatorio";

export class ControladoraRelatorio {

    visao: VisaoRelatorio;

    constructor() {
        this.visao = new VisaoRelatorio();
    }

    configurarRelatorio() {
        AdicionarBtnInicio();
        this.visao.configurarDatas();
        this.visao.configurarGerarRelatorio(this.gerarRelatorio.bind(this));
    }

    async gerarRelatorio() {
        const dataInicio = this.visao.dataInicio();
        const dataTermino = this.visao.dataTermino();

        const servicoRelatorio = new ServicoRelatorio();
        try {
            const relatorio = await servicoRelatorio.gerarRelatorio(dataInicio, dataTermino);
            this.visao.montarRelatorio(relatorio);
        } catch(e) {
            alert(e);
        }
    }

}