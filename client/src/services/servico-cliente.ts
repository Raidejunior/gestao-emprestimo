import { Cliente } from "../models/Cliente.ts";
import { API } from "../models/API.ts";

export class ServicoCliente {

    async localizarCliente(cpf: string): Promise<Cliente> {
         const resp = await fetch(API + `/clientes?cpf=${cpf}`);

        if(!resp.ok) {
            Cliente.salvarClienteSessionStorage(null);
            throw new Error('Erro ao buscar cliente');
        }

        const dados = await resp.json();

        if(dados.length === 0) {
            Cliente.salvarClienteSessionStorage(null);
            throw new Error('Nenhum cliente foi encontrado');
        }

        const {...dadosCliente} = dados;

        const cliente = new Cliente(dadosCliente.id, dadosCliente.nome, dadosCliente.cpf, dadosCliente.dataNascimento );

        return cliente;
    }
}