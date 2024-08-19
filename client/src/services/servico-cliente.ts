import { Cliente } from "../models/Cliente.ts";
import { API } from "../models/API.ts";

export class ServicoCliente {

    async localizarCliente(cpf: string): Promise<Cliente> {
         const resp = await fetch(API + `/clientes?cpf=${cpf}`, { credentials: 'include' });

        if(resp.status === 404) {
            Cliente.salvarClienteSessionStorage(null);
            throw new Error('Nenhum cliente foi encontrado');
            
        } else if(!resp.ok) {
            Cliente.salvarClienteSessionStorage(null);
            throw new Error('Erro ao buscar cliente');
        }
        
        const dadosCliente = await resp.json();        
        const cliente = new Cliente(dadosCliente.id, dadosCliente.nome, dadosCliente.cpf, dadosCliente.dataNascimento,  Number(dadosCliente.limiteCredito.toFixed(2)), 
            Number(dadosCliente.limiteCreditoUtilizado.toFixed(2)), Number(dadosCliente.limiteCreditoDisponivel.toFixed(2))
         );

        return cliente;
    }
}