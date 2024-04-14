export class VisaoCliente {
    
    cpf(): string {
        return ( document.getElementById('cpf') as HTMLInputElement ).value;
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