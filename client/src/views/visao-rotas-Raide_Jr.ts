export class VisaoRotas {

    hash(): string {
        return window.location.hash.slice(1);
    }

    carregarConteudo(html: string) {
        document.getElementById('conteudo')!.innerHTML = `
            ${html}	
        `
    }

    definirHashInicial(): void {
        window.location.hash = 'login';
    }

    definiarAcaoAoTrocarHash(funcao: Function): void {
        window.addEventListener('hashchange',  () => {
            funcao();
        });

        window.addEventListener('load',  () => {
            this.definirHashInicial();
            funcao();
        });
    }

}