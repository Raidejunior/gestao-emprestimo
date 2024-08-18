import { API } from "../models/API.ts";
import { Cliente } from "../models/Cliente.ts";
import { Emprestimo } from "../models/Emprestimo.ts";
import { FormaPagamento } from "../models/FormaPagamento.ts";

export class ServicoEmprestimo {

    async salvarEmprestimo(emprestimo: Emprestimo): Promise<boolean | Error> {
        const resp = await fetch(API + `/emprestimos`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emprestimo)
        });

        if(!resp.ok) {
            throw new Error('Erro ao salvar empréstimo!');
        }

        return true;
    }

    async buscarFormasDePagamento() {
        const resp = await fetch(API + '/forma_pagamento', { credentials: 'include' });
        if(!resp.ok) {
            throw new Error('Erro ao carregar formas de pagamento');
        }
        
        const dados = await resp.json();
        if(!dados){
            throw new Error('Nenhuma forma de pagamento encontrada');
        }
        
        return dados;
    }

    async buscarTodosEmprestimos(): Promise<Emprestimo[]> {
        const resp = await fetch(API + '/emprestimos');
        const dados = await resp.json();

        let emprestimos = []
        for(let dado of dados) {
            let formaPagamento = new FormaPagamento(0, '', Number(dado.parcelas), Number(dado.juros));
            let cliente = new Cliente(0, dado.cliente_nome, '12345678910', new Date());
            let emprestimo = new Emprestimo(Number(dado.valor), formaPagamento);
            emprestimo.cliente = cliente;

            const [data, hora] = dado.data_emprestimo.split(' ');
            const [ano, mes, dia] = data.split('-');
            const dataHora = `${dia}/${mes}/${ano} - ${hora}`; // Formatando a data e hora para o padrão brasileiro
            emprestimo.dataHora = dataHora;

            let valorPagoEmprestimo = Number(dado.valor) * (1 + Number(dado.juros) / 100); // calculando o total que será pago pelo empréstimo
            valorPagoEmprestimo = Number(valorPagoEmprestimo.toFixed(2));
            emprestimo.valorPagoEmprestimo = valorPagoEmprestimo;

            emprestimos.push(emprestimo);
        }

        return emprestimos;
    }

}