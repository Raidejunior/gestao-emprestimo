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
        const [dadosCliente] = dados;

        if(!dadosCliente) {
            Cliente.salvarClienteSessionStorage(null);
            throw new Error('Nenhum cliente foi encontrado');
        }

        const cliente = new Cliente(dadosCliente.nome, dadosCliente.cpf, dadosCliente.dataNascimento );

        return cliente;
    }
}