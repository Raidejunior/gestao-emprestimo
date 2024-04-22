export class VisaoCliente {
    
    cpf(): string {
        return this.desformataCPF(( document.getElementById('cpf') as HTMLInputElement ).value);
    }

    desformataCPF(cpfFormatado: string) {
        return cpfFormatado.replace(/\D/g, '');
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