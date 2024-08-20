import { API } from "../models/API.ts";
import { FuncionarioParaCadastro } from "../dto/FuncionarioParaCadastro.ts";

export class ServicoFuncionario {

    async cadastrarFuncionario(funcionario: FuncionarioParaCadastro): Promise<Response> {
        const resp = await fetch(API + `/funcionarios`, { 
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionario)
        });

        if (!resp.ok) {
            throw new Error('Erro ao cadastrar funcionário!');
        }

        return resp;
    }
}