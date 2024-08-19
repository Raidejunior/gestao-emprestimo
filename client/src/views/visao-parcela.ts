export class VisaoParcela {
    montarTabelaDeParcelas(parcelas: any): void {
        const parcelasHTML = parcelas.map(
            (p: { numero: any; valor: any; vencimento: any; pago: boolean; }) => {
                const valorParcela = p.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const status = p.pago ? "Pago" : `<button class="btn btn-success">Pagar</button>`;
                return (`
                <tr>
                    <td>${p.numero}</td>
                    <td>${valorParcela}</td>
                    <td>${p.vencimento}</td>
                    <td>${status}</td>
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