import { API } from "../models/API.ts";

export class ServicoCliente {

    async localizarCliente(cpf: string) {
         const resp = await fetch(API + `/clientes?cpf=${cpf}`);

        if(!resp.ok) {
            throw new Error('Erro ao buscar cliente');
        }

        const dados = await resp.json();
        const [dadosCliente] = dados;

        if(!dadosCliente) {
            throw new Error('Nenhum cliente foi encontrado');
        }

        return dadosCliente;
    }
}