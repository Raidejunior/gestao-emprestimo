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


    montarFormulario(nome: string, idade: number) {
        document.getElementById('conteudo')!.innerHTML = `
            <section id="form-emprestimo-header">
                <div>
                    <a class="btn btn-large" href="/">Início</a>
                </div>
                <h2 class="info-cliente">${nome}, ${idade} anos</h2>
            </section>
            <form class="form-emprestimo mb-3" id="form-emprestimo">
                <div class="valor-parcelas">
                    <label for="valor" class="form-label">Valor</label>
                    <input type="number" required class="form-control" id="valor">
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
            <button type="submit" form="form-emprestimo" class="btn btn-primary" id="realizar-emprestimo" hidden>Realizar empréstimo</button>
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

    desfazerParcelas(): void {
        document.getElementById('parcelas')!.innerHTML = '';
        document.getElementById('info-parcelas')!.innerHTML = '';
        (document.getElementById('realizar-emprestimo') as HTMLButtonElement).hidden = true;
    }

    montarTabelaDeEmprestimos(emprestimos: any): void {
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
    
    definirAcaoAoSairDoInputValor(funcao: Function) : void {
        document.getElementById('valor')?.addEventListener('blur', e => {
            const divAviso = document.querySelector('.form-text');
            const valor = Number((e.target as HTMLInputElement ).value);
            if(!valor){
                return;
            }

            if(!funcao(valor)) {
                if (divAviso !== null) {
                    divAviso.classList.add('div-aviso-valor-color-red');
                }
            }else{
                if (divAviso !== null) {
                    divAviso.classList.remove('div-aviso-valor-color-red');
                }
            }

            
        });
    }

    definirAcaoAoDigitarValor(funcaoVerificadora: Function, funcaoCalculadora: Function) {
        document.getElementById('valor')?.addEventListener('keyup', e => {
            const valor = Number((e.target as HTMLInputElement ).value);

            if(!valor || !funcaoVerificadora(valor)){ // Se o valor não for válido, o cálculo de parcelas não é feito
                this.desfazerParcelas(); // Se houver alguma parcela sendo mostrada, a tabela e as informações são defeitas
                return;
            }

            const formaPagamento = this.formaPagamento();
            if(!formaPagamento.id){ // Se não houver uma forma de pagamento, o cálculo de parcelas não é feito 
                return; 
            }

            funcaoCalculadora(valor);
        });
    } 

    definirAcaoAoSelecionarFormaDePg(funcaoVerificadora: Function, funcaoCalculadora: Function): void {
        document.getElementById('formas-pagamento')?.addEventListener('change', () => {
            const fp = this.formaPagamento();
            
            console.log(fp.id, this.valor);
            if(!fp.id || !funcaoVerificadora(this.valor())){ // Se não houver uma forma de pagamento definida ou o valor for inválido, o cálculo de parcelas não é feito
                return;
            }

            funcaoCalculadora();
        });
    }

    definirAcaoAoRealizarEmprestimo(funcao: Function): void {
        document.getElementById('realizar-emprestimo')
            ?.addEventListener('click', e => {
                e.preventDefault();

                funcao();
        });
    }

}