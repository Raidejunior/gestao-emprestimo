export class VisaoFuncionario {

    adicionarOpcaoRelatorio(): void{
        document.getElementById('menu')!.innerHTML += `
            <li>
                <a href="#relatorio">Acessar relatório<a>
            </li>
        `
    } 

}