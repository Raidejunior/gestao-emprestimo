export class VisaoEmprestimo {

    valor(): number {
        const valorEmprestimo = ( document.getElementById('valor') as HTMLInputElement ).value;

        return Number(valorEmprestimo);
    }

    formaPagamento(): { id: number, juros: number, numParcelas: number } {
        const select = document.getElementById('formas-pagamento') as HTMLSelectElement;
        const formaPagamento = select.options[select.selectedIndex];
        
        const id = Number(formaPagamento.dataset.id);
        const juros = Number(formaPagamento.dataset.juros);
        const numParcelas = Number(formaPagamento.dataset.parcelas);

        return { id, juros, numParcelas };
    }

    // <label for="valor">Valor:</label>
    // <input type="number" id="valor">
    // <label for="formas-pagamento">Forma de pagamento:</label>
    // <select id="formas-pagamento">
    //     <option value="" selected></option>
    // </select>
    // <button type="submit" id="realizar-emprestimo" hidden>Realizar empréstimo</button>

    montarFormulario(nome: string, idade: number) {
        document.getElementById('conteudo')!.innerHTML = `
            <section id="form-emprestimo-header">
                <div>
                    <a class="btn btn-large" href="/">Início</a>
                </div>
                <h2 class="info-cliente">${nome}, ${idade} anos</h2>
            </section>
            <form class="form-emprestimo mb-3">
                <div class="valor-parcelas">
                    <label for="valor" class="form-label">Valor</label>
                    <input type="number" class="form-control" id="valor">
                    <div class="form-text">Apenas valores entre R$500 e R$ 50.000</div>
                </div>
                <div class="forma-pagamento">
                    <label for="formas-pagamento" class="form-label">Forma de pagamento</label>
                    <select class="form-select" id="formas-pagamento" aria-label="Selecione">
                        <option selected>Selecione</option>
                    </select>
                </div>

            </form>
                
            <div id="info-parcelas"></div>
            <table id="parcelas" class="table table-striped"></table>
            <button type="submit" class="btn btn-primary" id="realizar-emprestimo" hidden>Realizar empréstimo</button>
        `
    }

    montarFormasDePagamento(dados: Array<any>): void {
        let formasDePagamentoHTML = dados.map(fp => `
            <option data-id="${fp.id}" data-parcelas="${fp.meses}" data-juros="${fp.juros}">${fp.descricao}</option>
        `);

        document.getElementById('formas-pagamento')!.innerHTML += formasDePagamentoHTML.join('\n');
    }

    montarParcelas(dados: any): void {
        const parcelasHTML = dados.parcelas.map((d: { numero: any; valor: any; vencimento: any; }) => {
            const mesVencimento = d.vencimento.getMonth() + 1; // meses começam com 0 em JS
            const vencimentoParcela = d.vencimento.getUTCDate() + '/' + (mesVencimento < 10 ? `0${mesVencimento}` : mesVencimento) + '/' + d.vencimento.getFullYear(); // formatando a data
            const valorParcela = d.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // formatando o valor das parcelas para R$
            
            return `
                <tr>
                    <td>${d.numero}</td>
                    <td>${valorParcela}</td> 
                    <td>${vencimentoParcela}</td>
                </tr>
            `
        });

        document.getElementById('info-parcelas')!.innerHTML = `
            <p>Juros: ${dados.juros}%</p>
            <p>Nº parcelas: ${dados.parcelas.length}</p>
            <p>Valor total a ser pago: ${dados.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        `;
        document.getElementById('parcelas')!.innerHTML = `
            <thead>
                <tr>
                    <th>Parcela</th>
                    <th>Valor</th>
                    <th>Vencimento</th>
                </tr>
            </thead>
            <tbody>
                ${parcelasHTML.join('\n')}  
            </tbody>
        `;

        (document.getElementById('realizar-emprestimo') as HTMLButtonElement).hidden = false;
    }

    MontarTabelaDeEmprestimos(emprestimos: any) {
        const emprestimosHTML = emprestimos.map(
            (e: { dataHora: any; cliente: { nome: any; }; valorSolicitadoEmprestimo: any; formaPagamento: { meses: any; juros: any; }; valorPagoEmprestimo: any; }) => {
                return (`
                <tr>
                    <td>${e.dataHora}</td>
                    <td>${e.cliente.nome}</td>
                    <td>${e.valorSolicitadoEmprestimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${e.formaPagamento.meses}</td>
                    <td>${e.formaPagamento.juros}%</td>
                    <td>${e.valorPagoEmprestimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                </tr>
        `)});

        document.getElementById('conteudo')!.innerHTML = `
            <section id="form-emprestimo-header">
                <div>
                    <a class="btn btn-large" href="/">Início</a>
                </div>
                <h2>Empréstimos</h2>
            </section>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Data - Hora</th>
                        <th>Cliente</th>
                        <th>Valor pedido</th>
                        <th>Parcelas</th>
                        <th>Juros</th>
                        <th>Valor a ser pago</th>
                    <tr>
                </thead>
                <tbody>
                    ${emprestimosHTML.join('\n')}
                </tbody>
            </table>
        `;
    }
    
    definirAcaoAoDigitarValor(funcao: Function) : void {
        document.getElementById('valor')?.addEventListener('blur', e => {
            const divAviso = document.querySelector('.form-text');
            const valor = (e.target as HTMLInputElement ).value;
            if(!valor){
                return;
            }

            if(!funcao(Number(valor))) {
                if (divAviso !== null) {
                    divAviso.classList.add('div-aviso-valor-color-red');
                }
                alert('O valor do empréstimo deve estar entre R$ 500 e R$ 50.000');
            }else{
                if (divAviso !== null) {
                    divAviso.classList.remove('div-aviso-valor-color-red');
                }
            }

            
        });
    }

    definirAcaoAoSelecionarFormaDePagamento(funcao: Function) {
        document.getElementById('formas-pagamento')?.addEventListener('change', () => {
            const { id, juros, numParcelas } = this.formaPagamento();
            
            if(!juros || !this.valor()){
                return;
            }

            funcao(id, numParcelas, juros);
        });
    }

    definirAcaoAoRealizarEmprestimo(funcao: Function): void {
        document.getElementById('realizar-emprestimo')
            ?.addEventListener('click', e => {
                e.preventDefault();

                const { id, juros, numParcelas } = this.formaPagamento();
                funcao(id, numParcelas, juros);
        });
    }

}