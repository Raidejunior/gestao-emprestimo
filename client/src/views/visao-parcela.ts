import { ParcelaParaListagem } from "../dto/ParcelaParaListagem";

export class VisaoParcela {

    definirAcaoAoClicar(funcao: Function): void {
        const botoes = document.getElementsByClassName('verParcelas'); // buscando todos os botões para configurá-los

        for(let botao of botoes) {
            botao.addEventListener('click', e => {
                e.preventDefault();

                // Pegando o id do empréstimo, que está como atributo do botão
                const emprestimoId = botao.getAttribute('data-idEmprestimo');
                
                // Passando o ID para a função
                funcao(Number(emprestimoId));
            });
        }
        document.getElementById('verParcelas')
        ?.addEventListener('click', e => {
            e.preventDefault();
            // Pegando o elemento da linha (tr) correspondente ao botão clicado
            const linha = (e.target as HTMLElement).closest('tr');
            
            // Pegando o ID da célula que está oculta
            const emprestimoId = linha?.querySelector('#emprestimoId')?.textContent;
            console.log(emprestimoId);
            
            // Passando o ID para a função
            if (emprestimoId) {
                funcao(emprestimoId.trim());
            }
        });
    }

    montarTabelaDeParcelas(parcelas: ParcelaParaListagem[]): void {
        console.log(parcelas);
        const parcelasHTML = parcelas.map(
            (p) => {
                const valorParcela = p.valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const status = p.status === 'aberta' ? `<button class="btn btn-success" data-parcelaId="${p.id} data-emprestimoId="${p.idEmprestimo}">Pagar</button>` : "Pago";
                return (`
                <tr>
                    <td>${p.numeroParcela}</td>
                    <td>${valorParcela}</td>
                    <td>${p.dataVencimento}</td>
                    <td>${p.dataPagamento}</td>
                    <td>${p.funcionarioQueConfirmouPg}</td>
                    <td hidden>${p.idEmprestimo}</td>
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
                        <th>Data Pagamento</th>
                        <th>Pg. confirmado por</th>
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