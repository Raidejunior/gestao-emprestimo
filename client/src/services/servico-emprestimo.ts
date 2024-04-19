import { API } from "../models/API.ts";

export class ServicoEmprestimo {

    async buscarFormasDePagamento() {
        
        const resp = await fetch(API + '/formapagamento');
        if(!resp.ok) {
            throw new Error('Erro ao carregar formas de pagamento');
        }
        
        const dados = await resp.json();
        if(!dados){
            throw new Error('Nenhuma forma de pagamento encontrada');
        }
        
        return dados;
    }

    async buscarFormaDePagamentoPeloId(id: number) {
        const resp = await fetch(API + `/formapagamento?id=${id}`);
        if(!resp.ok) {
            throw new Error('Erro ao carregar forma de pagamento');
        }

        const dados = await resp.json();
        if(!dados) {
            throw new Error('Nenhuma forma de pagamento encontrada');
        }

        return dados;
    }

    //async calcularParcelas(valorEmprestimo: number, formaPagamento: FormaPagamento)

    async calcularParcelas() {
        const resp = await fetch(API + `/calcular`);
        if(!resp.ok) {
            throw new Error('Erro ao calcular parcelas');
        }

        return await resp.json();
    }
}