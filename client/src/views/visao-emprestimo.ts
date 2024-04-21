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
            <h2 class="info-cliente">${nome}, ${idade} anos</h2>

            <form class="form-emprestimo">
                <label for="valor">Valor:</label>
                <input type="number" id="valor">
                <label for="formas-pagamento">Forma de pagamento:</label>
                <select id="formas-pagamento">
                    <option value="" selected></option>
                </select>
            </form>
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

        document.getElementById('conteudo')!.innerHTML += `
            <p>Juros: ${dados.juros}%</p>
            <p>Nº parcelas: ${dados.parcelas.length}</p>
            <p>Valor total a ser pago: ${dados.total}</p>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Parcela</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Vencimento</th>
                    </tr>
                </thead>
                <tbody>
                    ${parcelasHTML.join('\n')}  
                </tbody>
            </table>
        `;
    }
    
    definirAcaoAoDigitarValor(funcao: Function) : void {
        document.getElementById('valor')?.addEventListener('blur', e => {
            const valor = (e.target as HTMLInputElement ).value;
            if(!valor){
                return;
            }

            if(!funcao(Number(valor))) {
                alert('O valor do empréstimo deve estar entre R$ 500 e R$ 50.000');
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