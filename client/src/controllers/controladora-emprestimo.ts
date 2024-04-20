import { VisaoEmprestimo } from "../views/visao-emprestimo.ts";
import { ServicoEmprestimo } from "../services/servico-emprestimo.ts";
import { Emprestimo } from "../models/Emprestimo.ts";
import { FormaPagamento } from "../models/FormaPagamento.ts";

export class ControladoraEmprestimo {

    visao: VisaoEmprestimo;

    constructor() {
        this.visao = new VisaoEmprestimo();
    }

    configurarFormulario(): void {
        document.getElementById('form-emprestimo')!.hidden = false;

        this.carregarFormasDePagamento();
        this.configurarEmprestimo();
        this.configurarVerificaoDeValor();
        this.configurarCalculoDeParcelas();
    }

    async carregarFormasDePagamento(): Promise<void> {
        const servicoEmprestimo = new ServicoEmprestimo();
        const dados = await servicoEmprestimo.buscarFormasDePagamento();
        const formasPagamento = [];

        for(let dado of dados) {
            let formaPagamento = new FormaPagamento(dado.id, dado.descricao, dado.numMeses, dado.juros);
            formasPagamento.push(formaPagamento);
        }   

        this.visao.montarFormasDePagamento(formasPagamento);
    }

    async calcularParcelas(numParcelas: number, juros: number): Promise<Emprestimo> {
        const valor = this.visao.valor();
        const formaPagamento = new FormaPagamento(0, '', numParcelas, juros);

        const emprestimo = new Emprestimo(valor, formaPagamento);

        emprestimo.calculaParcelas();

        this.visao.montarParcelas({ 
            parcelas: emprestimo.parcelas, 
            juros: emprestimo.formaPagamento.juros,
            total: emprestimo.valorPagoEmprestimo
        });

        return emprestimo;
    }

    async salvarEmprestimo(numParcelas: number, juros: number) {
        const emprestimo = await this.calcularParcelas(numParcelas, juros);
        emprestimo.salvarEmprestimo();
    }

    private configurarCalculoDeParcelas(): void {
        this.visao.definirAcaoAoSelecionarFormaDePagamento(this.calcularParcelas.bind(this));
    }

    private configurarEmprestimo(): void {
        this.visao.definirAcaoAoRealizarEmprestimo(this.salvarEmprestimo.bind(this));
    }

    private configurarVerificaoDeValor(): void {
        this.visao.definirAcaoAoDigitarValor(Emprestimo.verificarValorEmprestimo);
    }
}