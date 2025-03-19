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
            const errorText = await resp.text(); // Extrai a resposta como texto
            throw new Error(errorText || "Erro ao cadastrar funcionario"); // Lança a mensagem de erro diretamente
        }

        return resp;
    }
}