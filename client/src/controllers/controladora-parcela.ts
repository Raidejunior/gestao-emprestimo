import { ServicoParcela } from "../services/servico-parcela";
import { VisaoParcela } from "../views/visao-parcela";

export class ControladoraParcela{

    visao: VisaoParcela;

    constructor(){
        this.visao = new VisaoParcela();
    }

    /**
    * Responsável por chamar o serviço para buscar as parcelas de um empréstimo específico.
    */
    async buscarParcelasPorEmprestimo(idEmprestimo: number) {
        const servicoParcela = new ServicoParcela();
        const parcelas = await servicoParcela.buscarParcelasPorEmprestimoId(idEmprestimo);
        this.visao.montarTabelaDeParcelas(parcelas);
    }
        
    
}