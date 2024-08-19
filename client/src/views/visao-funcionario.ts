export class VisaoFuncionario {

    adicionarOpcaoesGerente(): void{
        document.getElementById('menu')!.innerHTML += `
            <li>
                <a href="#cadastro-funcionario">Cadastrar funcionário</a>
            </li>
            <li>
                <a href="#relatorio">Acessar relatório</a>
            </li>
        `
    } 

}