export class VisaoHome {

    definirAcaoAoSair(funcao: Function): void {
        document.getElementById("menu")?.addEventListener('click', function(e) {
            const target = e.target as HTMLElement; // Aqui fazemos a assertiva de tipo pois pegando diretamente pelo botão não estava funcionando.
            if (target && target.id === "deslogar") {
                e.preventDefault();
                funcao();
            }
        });
    }

    adicionarOpcaoesGerente(): void{
        document.getElementById('menu')!.innerHTML += `
            <li>
                <a href="#cadastro-funcionario">
                <i class="fa-solid fa-user-tie"></i>
                Cadastrar funcionário</a>
            </li>
            <li>
                <a href="#relatorio">
                <i class="fa-solid fa-chart-column"></i>
                Acessar relatório</a>
            </li>
        `
    }

    mostrarMensagemErro(mensagem: string): void {
        const mensagemElemento = document.querySelector('#mensagemErro');
        if (mensagemElemento) {
            mensagemElemento.textContent = mensagem;
            mensagemElemento.classList.remove('d-none');
            mensagemElemento.classList.add('alert', 'alert-danger');
        }
    }
}
