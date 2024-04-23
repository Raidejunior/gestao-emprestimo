export class VisaoCliente {
    
    cpf(desformataCPF: Function): string {
        const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
            return desformataCPF(cpf);
    }


    mostrarResultado(msg: string): void {
        document.querySelector('output')!.innerText = msg;
    }

    definirAcaoAoBuscar(funcao: Function): void {
        document.getElementById('buscar')
            ?.addEventListener('click', e => {
                e.preventDefault();
                funcao();
        });
    }
}