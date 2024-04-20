export class VisaoEmprestimo {

    valor(): number {
        const valorEmprestimo = ( document.getElementById('valor') as HTMLInputElement ).value;

        return Number(valorEmprestimo);
    }

    formaPagamento(): { juros: number, numParcelas: number } {
        const select = document.getElementById('formas-pagamento') as HTMLSelectElement;
        const formaPagamento = select.options[select.selectedIndex];
            
        const juros = Number(formaPagamento.dataset.juros);
        const numParcelas = Number(formaPagamento.dataset.parcelas);

        return { juros, numParcelas};
    }

    montarFormasDePagamento(dados: Array<any>): void {
        let formasDePagamentoHTML = dados.map(fp => `
            <option value="${fp.id}" data-parcelas="${fp.numMeses}" data-juros="${fp.juros}">${fp.descricao}</option>
        `);

        document.getElementById('formas-pagamento')!.innerHTML += formasDePagamentoHTML.join('\n');
    }

    montarParcelas(dados: any): void {

        console.log(dados);

        document.getElementById('parcelas')!.innerHTML = `
            <thead><th>Parcela</th><th>Valor</th><th>Vencimento</th><thead>
        `

        const parcelasHTML = dados.parcelas.map((d: { numero: any; valor: any; vencimento: any; }) => {
            const mesVencimento = d.vencimento.getMonth() + 1; // meses começam com 0 em JS
            const vencimentoParcela = d.vencimento.getUTCDate() + '/' + (mesVencimento < 10 ? `0${mesVencimento}` : mesVencimento) + '/' + d.vencimento.getFullYear(); // formatando a data
            const valorParcela = d.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            return `
                <tr>
                    <td>${d.numero}</td>
                    <td>${valorParcela}</td> 
                    <td>${vencimentoParcela}</td>
                </tr>
            `
        });

        document.getElementById('parcelas')!.innerHTML += `
            <tbody>
                    <tr>
                        <td>Juros: ${dados.juros}%</td>
                        <td>Nº parcelas: ${dados.parcelas.length}</td>
                        <td>Valor total a ser pago: ${dados.total}</td>
                    </tr>
                    ${parcelasHTML.join('\n')}
            </tbody>
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
            const { juros, numParcelas } = this.formaPagamento();
            
            if(!juros || !this.valor()){
                return;
            }

            funcao(numParcelas, juros);
        });
    }

    definirAcaoAoRealizarEmprestimo(funcao: Function): void {
        document.getElementById('realizar-emprestimo')
            ?.addEventListener('click', e => {
                e.preventDefault();

                const { juros, numParcelas } = this.formaPagamento();
                funcao(numParcelas, juros);
        });
    }

}