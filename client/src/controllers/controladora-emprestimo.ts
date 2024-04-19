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

    async calcularParcelas(): Promise<void> {
        const servicoEmprestimo = new ServicoEmprestimo();
        //const dados = await servicoEmprestimo.buscarFormaDePagamentoPeloId(idFormaPagamento);

        const parcelas = await servicoEmprestimo.calcularParcelas();

        this.visao.montarParcelas(parcelas);
    }

    private configurarCalculoDeParcelas(): void {
        this.visao.definirAcaoAoSelecionarFormaDePagamento(this.calcularParcelas.bind(this));
    }

    private configurarEmprestimo(): void {
        //this.visao.definirAcaoAoRealizarEmprestimo(this.realizarEmprestimo.bind(this));
    }

    private configurarVerificaoDeValor(): void {
        this.visao.definirAcaoAoDigitarValor(Emprestimo.verificarValorEmprestimo);
    }
}