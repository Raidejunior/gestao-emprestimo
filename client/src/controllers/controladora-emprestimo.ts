import { VisaoEmprestimo } from "../views/visao-emprestimo.ts";
import { ServicoEmprestimo } from "../services/servico-emprestimo.ts";
import { Emprestimo } from "../models/Emprestimo.ts";
import { FormaPagamento } from "../models/FormaPagamento.ts";

export class ControladoraEmprestimo {

    visao: VisaoEmprestimo;

    constructor() {
        this.visao = new VisaoEmprestimo();
    }

    configurarFormulario(nome:string, idade: number): void {
        this.visao.montarFormulario(nome, idade);
        
        this.carregarFormasDePagamento();
        this.configurarCalcDeParcelasAoSelecionaFormaDePg();
        this.configurarEmprestimo();
        this.configurarCalcDeParcelasAoDigitarValor();
    }

    async carregarFormasDePagamento(): Promise<void> {
        const servicoEmprestimo = new ServicoEmprestimo();
        const dados = await servicoEmprestimo.buscarFormasDePagamento();
        const formasPagamento = [];
        
        for(let dado of dados) {
            let formaPagamento = new FormaPagamento(dado.id, dado.descricao, dado.meses, dado.juros);
            formasPagamento.push(formaPagamento);
        }   

        this.visao.montarFormasDePagamento(formasPagamento);
    }

    calcularParcelas(): Emprestimo {
        const valor = this.visao.valor();
        const fp = this.visao.formaPagamento();
        const formaPagamento = new FormaPagamento(fp.id, '', fp.numParcelas, fp.juros);

        const emprestimo = new Emprestimo(valor, formaPagamento);

        emprestimo.calculaParcelas();

        return emprestimo;
    }

    montarParcelas(): void {
        const emprestimo = this.calcularParcelas();

        this.visao.montarParcelas({ 
            parcelas: emprestimo.parcelas, 
            juros: emprestimo.formaPagamento.juros,
            total: emprestimo.valorPagoEmprestimo
        });
    }

    /**
     * Responsável por chamar o serviço para salvar um empréstimo
    */
    async salvarEmprestimo() {
        try {
            const emprestimo = this.calcularParcelas();
            const resp = await emprestimo.salvarEmprestimo();
            if(resp) {
                this.visao.mostrarMensagem(true);
                this.visao.definirAcaoAoSalvarEmprestimo(this.buscarTodosEmprestimos.bind(this));
            } else {
                this.visao.mostrarMensagem(false);
            }
        } catch(e) {
            this.visao.mostrarMensagem(false);
        }

    }

    /**
    * Responsável por chamar o serviço para buscar todos os empréstimos
    */
    async buscarTodosEmprestimos() {
        const servicoEmprestimo = new ServicoEmprestimo();
        const emprestimos = await servicoEmprestimo.buscarTodosEmprestimos();
        this.visao.montarTabelaDeEmprestimos(emprestimos);
    }

    
    private configurarCalcDeParcelasAoSelecionaFormaDePg(): void {
        this.visao.definirAcaoAoSelecionarFormaDePg(Emprestimo.verificarValorEmprestimo, this.montarParcelas.bind(this));
    }
    
    private configurarCalcDeParcelasAoDigitarValor(): void {
        this.visao.definirAcaoAoDigitarValor(Emprestimo.verificarValorEmprestimo, this.montarParcelas.bind(this));
    }

    private configurarEmprestimo(): void {
        this.visao.definirAcaoAoConfirmarEmprestimo(this.salvarEmprestimo.bind(this));
    }
}