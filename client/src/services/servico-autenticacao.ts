import { FuncionarioParaSessionStorage } from "../dto/FuncionarioParaSessionStorage.ts";
import { API } from "../models/API.ts";
export class ServicoAutenticacao {
    async autenticar(login: string, senha: string): Promise<FuncionarioParaSessionStorage|null> {
        try {
            const resp = await fetch(API + `/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, senha }),
                credentials: "include"
            });

            const data = await resp.json();
            
            const funcionario = new FuncionarioParaSessionStorage(data.login, data.permissao);
            
            return funcionario; 
        } catch (error) {
            console.error('Erro ao autenticar:', error);
            return null;
        }
    }

    async deslogar(){
        try {
            const resp = await fetch(API + `/login`, {
                method: 'DELETE',
                credentials: "include"
            });

            if(resp.ok)
            {
                return true;
            }
            return false;
        } catch(error) {
            console.error('Erro ao deslogar', error);
            return false;
        }
    }
}
