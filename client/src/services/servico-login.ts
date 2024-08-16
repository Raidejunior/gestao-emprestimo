import { API } from "../models/API.ts";
export class ServicoLogin {
    async autenticar(login: string, senha: string): Promise<boolean> {
        try {
            const resp = await fetch(API + `/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, senha })
            });

            const data = await resp.json();
            console.log(data);
            return true; // Supondo que a resposta tem um campo `success`
        } catch (error) {
            console.error('Erro ao autenticar:', error);
            return false;
        }
    }
}
