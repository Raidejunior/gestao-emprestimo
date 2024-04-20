import { API } from "../models/API.ts";
import { Emprestimo } from "../models/Emprestimo.ts";

export class ServicoEmprestimo {


    async salvarEmprestimo(emprestimo: Emprestimo) {
        console.log(emprestimo);
        const resp = await fetch(API + '/emprestimos', { 
            body: JSON.stringify(emprestimo),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if(!resp.ok) {
            throw new Error('Erro ao salvar empréstimo!');
        }
    }

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


}