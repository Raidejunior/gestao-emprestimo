import { ServicoParcela } from "../services/servico-parcela";
import { VisaoParcela } from "../views/visao-parcela";

export class ControladoraParcela{

    visao: VisaoParcela;

    constructor(){
        this.visao = new VisaoParcela();
    }

    configurarParcela(): void {
        this.visao.definirAcaoAoClicar(this.buscarParcelasPorEmprestimo.bind(this));
    }

    /**
    * Responsável por chamar o serviço para buscar as parcelas de um empréstimo específico.
    */
    async buscarParcelasPorEmprestimo(idEmprestimo: string) {
        const servicoParcela = new ServicoParcela();
        const parcelas = await servicoParcela.buscarParcelasPorEmprestimoId(idEmprestimo);
        this.visao.montarTabelaDeParcelas(parcelas);
    }
        
    
}