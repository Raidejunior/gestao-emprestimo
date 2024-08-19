import { Cliente } from "../models/Cliente.ts";
import { API } from "../models/API.ts";
import { ClienteDTO } from '../dto/ClienteDadosFormulario';

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
        
        const dados = await resp.json();        
        const {...dadosCliente} = dados;
        const cliente = new Cliente(dadosCliente.id, dadosCliente.nome, dadosCliente.cpf, dadosCliente.dataNascimento );

        return cliente;
    }

    async cadastrarCliente(cliente: ClienteDTO): Promise<Response> {
        const response = await fetch('http://localhost:8080/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente),
            credentials: "include"
        });

        return response;
    }
}