import { ServicoEmprestimo } from "../services/servico-emprestimo";
import { Cliente } from "./Cliente"
import { FormaPagamento } from "./FormaPagamento"
import { Parcela } from "./Parcela";

const VALOR_MIN = 500;
const VALOR_MAX = 50000;

export class Emprestimo {
    
    cliente?: Cliente;
    valorSolicitadoEmprestimo: number;
    formaPagamento: FormaPagamento;
    dataHora?: Date | String;
    valorPagoEmprestimo?: number = 0
    parcelas?: Array<Parcela>

    constructor(valorEmp: number, formaPag: FormaPagamento) {
        this.valorSolicitadoEmprestimo = valorEmp;
        this.formaPagamento = formaPag;
    }


    /**
     * Calcula as parcelas do empréstimo
     */
    calculaParcelas(): void {
        const valorTotal = this.formataNumero(this.valorSolicitadoEmprestimo * (1 + this.formaPagamento.juros / 100));
        const valorParcela = this.formataNumero(valorTotal / this.formaPagamento.meses);
        let diferenca = this.formataNumero(valorTotal - valorParcela * this.formaPagamento.meses);
        this.parcelas = [];
        

        for(let i = 0; i < this.formaPagamento.meses; i++) {
            let dataParcelaAtual = new Date();
            dataParcelaAtual.setUTCHours(dataParcelaAtual.getUTCHours() - 3); // Ajusta a data e hora para o fuso horário brasileiro
            dataParcelaAtual.setMonth(dataParcelaAtual.getMonth() + 1 + i); // Adicionando 30 dias para o vencimento de cada parcela

            this.parcelas!.push(new Parcela(i + 1, dataParcelaAtual, valorParcela));
        }

        while(diferenca != 0) {
            diferenca = this.distribuirDiferenca(diferenca); // Enquanto a diferença for diferente de 0, as parcelas são reajustadas
        }

        for(let parcela of this.parcelas!) {
            this.valorPagoEmprestimo! += this.formataNumero(parcela.valor); // Calculando o valor total que será pago pelo empréstimo
        }

        this.valorPagoEmprestimo = this.formataNumero(this.valorPagoEmprestimo!);
    }

    /**
     * 
     * @param diferenca A diferença entre o valor total a ser pago pelo emprestimo e o valor que está dividido entre as parcelas
     * @returns A nova diferença após a distribuição do valor das parcelas
     */
    private distribuirDiferenca(diferenca: number): number {

        if(diferenca < 0) { // Se a diferença for menor que 0, significa que o cliente pagará a mais pelo empréstimo

            for(let i = this.parcelas!.length - 1; i >= 0; i--) {
                this.parcelas![i].valor = this.formataNumero(this.parcelas![i].valor -= 0.01); // O ajuste do valor é feito nas últimas parcelas do empréstimo
                diferenca += 0.01;

                if(diferenca == 0){
                    break;
                }
            }

        } else if(diferenca > 0) { // Se a diferença for maior que 0, significa que o cliente pagará a menos pelo empréstimo

            for(let i = 0; i < this.parcelas!.length -1; i++) {
                this.parcelas![i].valor = this.formataNumero(this.parcelas![i].valor += 0.01); // O ajuste do valor é feito nas primeiras parcelas do empréstimo
                diferenca -= 0.01;
                
                if(diferenca == 0){
                    break;
                }
            }
        }
        
        return this.formataNumero(diferenca);
    }


    /**
     * 
     * @param numero Número a ser formatado
     * @returns Um número formatado com duas casa decimais
     */
    private formataNumero(numero: number): number {
        return Number(numero.toFixed(2));
    }

   
    async salvarEmprestimo(): Promise<boolean | Error> {

        try {
            const dadosCliente = JSON.parse(sessionStorage.getItem('cliente')!);
            const dtNascimento = new Date(dadosCliente.dataNascimento);
            const dataNascimentoFormatada = `${dtNascimento.getFullYear() + '-' + (dtNascimento.getMonth() + 1) + '-' + dtNascimento.getUTCDate()}` // formatando a data
            const cliente = new Cliente(dadosCliente.id, dadosCliente.nome, dadosCliente.cpf, dataNascimentoFormatada);
            this.cliente = cliente;
            this.dataHora = new Date();

            const servicoEmprestimo = new ServicoEmprestimo();

            return await servicoEmprestimo.salvarEmprestimo(this);
        } catch(e) {
            throw new Error('Erro ao salvar empréstimo');
        }
    }

    /**
     * 
     * @param valor Valor a ser verificado
     * @returns Retorna true se o valor é válido para um empréstimo
     */
    static verificarValorEmprestimo(valor: number, limiteCreditoCliente: number = VALOR_MAX) {
        if(valor < VALOR_MIN || valor > limiteCreditoCliente) {
            return false;
        }
        return true;
    }
}