export class VisaoRotas {

    hash(): string {
        return window.location.hash.slice(1);
    }

    carregarConteudo(html: string) {
        document.getElementById('conteudo')!.innerHTML = `
            ${html}	
        `
    }

    definiarAcaoAoTrocarHash(funcao: Function): void {
        window.addEventListener('hashchange',  () => {
            funcao();
        });

        window.addEventListener('load',  () => {
            funcao();
        });
    }

}