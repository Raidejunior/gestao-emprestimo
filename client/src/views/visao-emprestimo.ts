export class VisaoEmprestimo {

    valor(): number {
        const valorEmprestimo = ( document.getElementById('valor') as HTMLInputElement ).value;

        return Number(valorEmprestimo);
    }

    formaPagamento(): number {
        const formaPagamento = ( document.getElementById('forma-pagamento') as HTMLSelectElement ).value;

        return Number(formaPagamento);
    }

    montarFormasDePagamento(dados: Array<any>): void {
        let formasDePagamentoHTML = dados.map(fp => `<option value="${fp.id}">${fp.descricao}</option>`);

        document.getElementById('formas-pagamento')!.innerHTML += formasDePagamentoHTML.join('\n');
    }

    montarParcelas(dados: any): void {
        document.getElementById('parcelas')!.innerHTML += `
            <thead><th>Parcela</th><th>Valor</th><th>Vencimento</th><thead>
        `
        const parcelas = dados.parcelas;
        const parcelasHTML = parcelas.map((d: { numero: any; valor: any; vencimento: any; }) => `<tr><td>${d.numero}</td><td>${d.valor}</td><td>${d.vencimento}</td></tr>`);
        document.getElementById('parcelas')!.innerHTML += `
            <tbody>${parcelasHTML.join('\n')}</tbody>
        `
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
        document.getElementById('formas-pagamento')?.addEventListener('change', e => {
            const opcao = (e.target as HTMLOptionElement).value;
            if(!opcao || !this.valor()){
                return;
            }

            funcao(Number(opcao));
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