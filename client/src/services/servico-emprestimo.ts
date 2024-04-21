import { API } from "../models/API.ts";
import { Emprestimo } from "../models/Emprestimo.ts";

export class ServicoEmprestimo {


    async salvarEmprestimo(emprestimo: Emprestimo) {
        const resp = await fetch(API + `/salvar_emprestimo?cliente_id=${emprestimo.cliente?.id}&valor=${emprestimo.valorSolicitadoEmprestimo}&forma_pagamento_id=${emprestimo.formaPagamento.id}`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if(!resp.ok) {
            throw new Error('Erro ao salvar empréstimo!');
        }
    }

    async buscarFormasDePagamento() {
        
        const resp = await fetch(API + '/forma_pagamento');
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
        const resp = await fetch(API + `/forma_pagamento?id=${id}`);
        if(!resp.ok) {
            throw new Error('Erro ao carregar forma de pagamento');
        }

        const dados = await resp.json();
        if(!dados) {
            throw new Error('Nenhuma forma de pagamento encontrada');
        }

        return dados;
    }


}