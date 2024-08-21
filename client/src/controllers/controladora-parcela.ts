import { ServicoParcela } from "../services/servico-parcela";
import { VisaoParcela } from "../views/visao-parcela";

export class ControladoraParcela {

    visao: VisaoParcela;
    servicoParcela: ServicoParcela;

    constructor(){
        this.visao = new VisaoParcela();
        this.servicoParcela = new ServicoParcela();
    }

    configurarParcela(): void {
        this.visao.definirAcaoAoClicar(this.buscarParcelasPorEmprestimo.bind(this));
    }

    async buscarParcelasPorEmprestimo(emprestimoId: string) {
        const parcelas = await this.servicoParcela.buscarParcelasPorEmprestimoId(emprestimoId);
        this.visao.montarTabelaDeParcelas(parcelas);
        this.visao.definirAcaoAoClicarBtnPagarParcela(this.pagarParcelasPorEmprestimo.bind(this));
    }

    async pagarParcelasPorEmprestimo(emprestimoId: Number, parcelaId: Number) {
        try {
            const sucesso = await this.servicoParcela.pagarParcelasPorEmprestimoId(emprestimoId, parcelaId);
            if(sucesso) {
                await this.buscarParcelasPorEmprestimo(String(emprestimoId)); // Recarrega a tabela sem recarregar a página
                this.visao.mostrarMensagemSucesso('Pagamento realizado com sucesso!');
            }
        } catch (erro) {
            console.error(erro);
            this.visao.mostrarMensagemErro('Erro ao realizar pagamento da parcela. Tente novamente.');
        }
    }
}
