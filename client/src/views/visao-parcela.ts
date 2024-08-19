export class VisaoParcela {

    definirAcaoAoClicar(funcao: Function): void {
        document.getElementById('verParcelas')
        ?.addEventListener('click', e => {
            e.preventDefault();
            // Pegando o elemento da linha (tr) correspondente ao botão clicado
            const linha = (e.target as HTMLElement).closest('tr');
            
            // Pegando o ID da célula que está oculta
            const emprestimoId = linha?.querySelector('#emprestimoId')?.textContent;
            
            // Passando o ID para a função
            if (emprestimoId) {
                funcao(emprestimoId.trim());
            }
        });
    }

    montarTabelaDeParcelas(parcelas: any): void {
        const parcelasHTML = parcelas.map(
            (p: { id:number; numero_parcela: any; valor_parcela: any; data_vencimento: any; status: string; id_emprestimo: number; pago: boolean; }) => {
                const valorParcela = p.valor_parcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const status = p.status ? `<button class="btn btn-success">Pagar</button>` : "Pago";
                return (`
                <tr>
                    <td>${p.numero_parcela}</td>
                    <td>${valorParcela}</td>
                    <td>${p.data_vencimento}</td>
                    <td>${status}</td>
                    <td hidden>${p.id_emprestimo}</td>
                </tr>
            `)});
    
        document.getElementById('conteudo')!.innerHTML = `
            <section id="form-parcelas-header">
                <div>
                    <a class="btn btn-large" href="#emprestimos">Voltar</a>
                </div>
                <h2>Parcelas</h2>
            </section>
    
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Parcela</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                        <th>Status</th>
                    <tr>
                </thead>
                <tbody>
                    ${parcelasHTML.join('\n')}
                </tbody>
            </table>
        `;
    }
    
}