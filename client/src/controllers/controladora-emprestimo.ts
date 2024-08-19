import { VisaoEmprestimo } from "../views/visao-emprestimo.ts";
import { ServicoEmprestimo } from "../services/servico-emprestimo.ts";
import { Emprestimo } from "../models/Emprestimo.ts";
import { FormaPagamento } from "../models/FormaPagamento.ts";
import { ControladoraParcela } from "./controladora-parcela.ts";

export class ControladoraEmprestimo {

    visao: VisaoEmprestimo;

    constructor() {
        this.visao = new VisaoEmprestimo();
    }

    /**
    * Responsável por todas as chamadas iniciais necessárias para o funcionamento do formulário.
    */
    configurarFormulario(nome:string, idade: number, limiteCredito: number, limiteCreditoDisponivel: number, limiteCreditoUtilizado: number): void {
        this.visao.montarFormulario(nome, idade, limiteCredito, limiteCreditoDisponivel, limiteCreditoUtilizado);
        
        this.carregarFormasDePagamento();
        this.configurarCalcDeParcelasAoSelecionaFormaDePg(limiteCreditoDisponivel);
        this.configurarEmprestimo();
        this.configurarCalcDeParcelasAoDigitarValor(limiteCreditoDisponivel);
    }

    /**
    * Responsável por carregar as formas de pagamento do DB e chamar método para carregá-las na tela.
    */
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

    /**
    * Responsável por chamar método na model para calcular seu empréstimo e retorná-lo. 
    * @return Emprestimo
    */
    calcularParcelas(): Emprestimo {
        const valor = this.visao.valor();
        const fp = this.visao.formaPagamento();
        const formaPagamento = new FormaPagamento(fp.id, '', fp.numParcelas, fp.juros);

        const emprestimo = new Emprestimo(valor, formaPagamento);

        emprestimo.calculaParcelas();

        return emprestimo;
    }

    /**
    * Responsável por chamar método na visao para montar as parcelas do empréstimo na tela.
    */
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
        let controlParcela = new ControladoraParcela();
        controlParcela.configurarParcela();
    }

    /**
    * Responsável por chamar método na visao para definir qual ação será feita quando for selecionado a forma de pagamento.
    */
    private configurarCalcDeParcelasAoSelecionaFormaDePg(LimiteCreditoCliente: number): void {
        this.visao.definirAcaoAoSelecionarFormaDePg(Emprestimo.verificarValorEmprestimo, this.montarParcelas.bind(this), LimiteCreditoCliente);
    }
    
    /**
    * Responsável por chamar método na visao para definir qual ação será feita quando for selecionado o valor do empréstimo.
    */
    private configurarCalcDeParcelasAoDigitarValor(LimiteCreditoCliente: number): void {
        this.visao.definirAcaoAoDigitarValor(Emprestimo.verificarValorEmprestimo, this.montarParcelas.bind(this), LimiteCreditoCliente);
    }

    /**
    * Responsável por chamar método na visao para definir qual ação será feita quando for confirmado o empréstimo.
    */
    private configurarEmprestimo(): void {
        this.visao.definirAcaoAoConfirmarEmprestimo(this.salvarEmprestimo.bind(this));
    }
}