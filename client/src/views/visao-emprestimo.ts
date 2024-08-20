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

    nomeCliente(): string {
        const nome = (document.querySelector('.info-cliente span') as HTMLSpanElement).textContent;

        return String(nome);
    }


    montarFormulario(nome: string, idade: number, limiteCredito: number, limiteCreditoDisponivel: number, limiteCreditoUtilizado:number) {
        
        document.getElementById('conteudo')!.innerHTML = `
            <section id="form-emprestimo-header">
                <div>
                    <a class="btn btn-large" href="#home">Início</a>
                </div>
                <h2 class="info-cliente"><span>${nome}</span>, ${idade} anos</h2>
                <div>Limite de crédito do cliente: ${limiteCredito.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                <div>Limite de crédito utilizado: ${limiteCreditoUtilizado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                <div>Limite de crédito disponível: ${limiteCreditoDisponivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </section>
            <form class="form-emprestimo mb-3" id="form-emprestimo">
                <div class="valor-parcelas">
                    <label for="valor" class="form-label">Valor</label>
                    <input type="number" required class="form-control" id="valor">
                    <div class="form-text">Apenas valores entre R$ 500 e ${limiteCreditoDisponivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
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
            <button type="submit" form="form-emprestimo" class="btn btn-primary" id="realizar-emprestimo" data-toggle="modal" data-target="#modalEmprestimo" hidden>Realizar empréstimo</button>
        `; // adicionando o form de empréstimo a tela

        this.montarDialogoAoClicarEmRealizarEmprestimo(); // Configurando o modal para confirmar o empréstimo

        this.definirAcaoAoClicarEmRealizarEmprestimo(); // Passando os dados de valor e nome do cliente para o modal
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
            <p>Nº de parcelas: ${dados.parcelas.length}</p>
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
            (e: { id: number, dataHora: any; cliente: { nome: any; }; valorSolicitadoEmprestimo: any; formaPagamento: { meses: any; juros: any; }; valorPagoEmprestimo: any; }) => {
                return (`
                <tr>
                    <td id="emprestimoId" hidden>${e.id}</td>
                    <td>${e.dataHora}</td>
                    <td>${e.cliente.nome}</td>
                    <td>${e.valorSolicitadoEmprestimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${e.formaPagamento.meses}</td>
                    <td>${e.formaPagamento.juros}%</td>
                    <td>${e.valorPagoEmprestimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td><button class="btn btn-info" id="verParcelas">Ver Parcelas</button></td>
                </tr>
        `)});
    
        document.getElementById('conteudo')!.innerHTML = `
            <section id="form-emprestimo-header">
                <div>
                    <a class="btn btn-large" href="#home">Início</a>
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
                        <th>Ações</th>
                    <tr>
                </thead>
                <tbody>
                    ${emprestimosHTML.join('\n')}
                </tbody>
            </table>
        `;
    }
    

    montarDialogoAoClicarEmRealizarEmprestimo(): void { 
        document.getElementById('conteudo')!.innerHTML += `
        <div class="modal fade" id="modalEmprestimo" tabindex="-1" role="dialog"  aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="emprestimoModalLabel">Confirmar empréstimo</h5>
                    </div>
                    <div class="modal-body">
                        <p>
                            Deseja confirmar o empréstimo de <strong><span id="valor-parcela"></span></strong>
                            para <strong><span id="nome-cliente"></span></strong>?
                        </p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" id="confirmar-emprestimo" class="btn btn-success">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    mostrarMensagem(sucesso: boolean): void {
        const classe = sucesso ? 'success' : 'danger';
        const titulo = sucesso ? 'Sucesso' : 'Erro';
        const msg = sucesso ? 'Empréstimo realizado com sucesso' : 'Erro ao realizar empréstimo';
        const acao = sucesso ? 'id="buscar-emprestimos" data-dismiss="modal"' : 'data-dismiss="modal"'; // em caso de sucesso, o id é atribuido ao botão para realizar a busca quando for clicado
        const textoBotao = sucesso ? 'Visualizar lista de empréstimos' : 'Ok';

        document.querySelector('.modal-content')!.innerHTML = `
            <div class="alert alert-${classe}" role="alert">
                <h4 class="alert-heading">${titulo}</h4>
                <hr>
                <p>${msg}</p>
                <button type="button" ${acao} class="btn btn-${classe}">${textoBotao}</button>
            </div>
        `;
    }

    definirAcaoAoDigitarValor(funcaoVerificadora: Function, funcaoCalculadora: Function, LimiteCreditoCliente: number) {
        document.getElementById('valor')?.addEventListener('input', e => {
            const valor = Number((e.target as HTMLInputElement ).value);
            const divAviso = document.querySelector('.form-text');

            if(! valor || ! funcaoVerificadora(valor, LimiteCreditoCliente)) {
                     // alterando
                    divAviso!.classList.add('div-aviso-valor-color-red'); // se o valor não for válido, o texto da div ficará com a cor vermelha
                    (document.getElementById('realizar-emprestimo') as HTMLButtonElement).disabled = true; // desabilitando o botão de submit do form de empréstimo
                    this.desfazerParcelas(); // Se houver alguma parcela sendo mostrada, a tabela e as informações são defeitas
                    return;
            } else {
                    divAviso!.classList.remove('div-aviso-valor-color-red');
            }

            // if(!valor || !funcaoVerificadora(valor, LimiteCreditoCliente)){ // Se o valor não for válido, o cálculo de parcelas não é feito
            //     (document.getElementById('realizar-emprestimo') as HTMLButtonElement).disabled = true; // desabilitando o botão de submit do form de empréstimo
            //     this.desfazerParcelas(); // Se houver alguma parcela sendo mostrada, a tabela e as informações são defeitas
            //     return;
            // }

            const formaPagamento = this.formaPagamento();
            if(!formaPagamento.id){ // Se não houver uma forma de pagamento, o cálculo de parcelas não é feito 
                (document.getElementById('realizar-emprestimo') as HTMLButtonElement).disabled = true;
                return; 
            }

            (document.getElementById('realizar-emprestimo') as HTMLButtonElement).disabled = false; // caso tudo esteja certo, o botão é habilitado
            funcaoCalculadora(valor);
        });
    } 

    definirAcaoAoSelecionarFormaDePg(funcaoVerificadora: Function, funcaoCalculadora: Function, LimiteCreditoCliente: number): void {
        document.getElementById('formas-pagamento')?.addEventListener('change', () => {
            const fp = this.formaPagamento();
            console.log(LimiteCreditoCliente);
            if(!fp.id || !funcaoVerificadora(this.valor(), LimiteCreditoCliente)){ // Se não houver uma forma de pagamento definida ou o valor for inválido, o cálculo de parcelas não é feito
                (document.getElementById('realizar-emprestimo') as HTMLButtonElement).disabled = true;

                this.desfazerParcelas(); // desfazendo parcelas caso a forma de pagamento não seja válida
                return;
            }

            (document.getElementById('realizar-emprestimo') as HTMLButtonElement).disabled = false;
            funcaoCalculadora();
        });
    }

    definirAcaoAoClicarEmRealizarEmprestimo(): void {

        document.getElementById('realizar-emprestimo')?.addEventListener('click', e => {
            e.preventDefault();

            (document.getElementById('valor-parcela') as HTMLSpanElement).textContent = this.valor().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            (document.getElementById('nome-cliente') as HTMLSpanElement).textContent = this.nomeCliente();
        });
    }

    definirAcaoAoConfirmarEmprestimo(funcao: Function): void {
        document.getElementById('confirmar-emprestimo')
            ?.addEventListener('click', e => {
                e.preventDefault();
                (e.target as HTMLButtonElement).disabled = true;

                funcao();
        });
    }

    definirAcaoAoSalvarEmprestimo(funcao: Function): void {
        document.getElementById('buscar-emprestimos')!.addEventListener('click', e => {
            e.preventDefault();
            
            funcao();
        });
    }

}