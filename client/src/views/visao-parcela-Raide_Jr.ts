import { ParcelaParaListagem } from "../dto/ParcelaParaListagem";
import { AdicionarBtnVoltar } from "../utils/AdicionarBtnVoltar";

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
    }

    definirAcaoAoClicarBtnPagarParcela(funcao: Function): void {
        document.getElementById('btnPagarParcela')?.addEventListener('click', e => {
            e.preventDefault();
    
            // Pegando os valores dos atributos de dados do botão
            const emprestimoId = (e.target as HTMLElement).getAttribute('data-emprestimoId');
            const parcelaId = (e.target as HTMLElement).getAttribute('data-parcelaId');
    
            if (emprestimoId && parcelaId) {
                funcao(Number(emprestimoId), Number(parcelaId));
            } else {
                console.error("Erro ao recuperar os IDs da parcela ou do empréstimo.");
            }
        });
    }
    

    montarTabelaDeParcelas(parcelas: ParcelaParaListagem[]): void {
        let control = true;
        const parcelasHTML = parcelas.map(
            (p) => {
                const valorParcela = p.valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                let status;
                switch(p.status) { // Permitindo que apenas a primeira parcela em aberto seja paga
                    case 'aberta':
                        if(control) {
                            status = `<button class="btn btn-success" id="btnPagarParcela" data-parcelaId="${p.id}" data-emprestimoId="${p.idEmprestimo}">Pagar</button>`;
                            control = false;
                            break;
                        }
                        status = 'A receber';
                        break;
                    case 'paga':
                        status = 'Paga';
                        break;
                }

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

            <div id="mensagemSucesso" class="d-none"></div>

            <div id="mensagemErro" class="d-none"></div>

        `;

        window.location.hash = '';

        AdicionarBtnVoltar();
        
    }
    
    mostrarMensagemSucesso(mensagem: string): void {
        const mensagemElemento = document.querySelector('#mensagemSucesso');
        if (mensagemElemento) {
            mensagemElemento.textContent = mensagem;
            mensagemElemento.classList.remove('d-none');
            mensagemElemento.classList.add('alert', 'alert-success');
        }
    }

    
    mostrarMensagemErro(mensagem: string): void {
        const mensagemElemento = document.querySelector('#mensagemErro');
        if (mensagemElemento) {
            mensagemElemento.textContent = mensagem;
            mensagemElemento.classList.remove('d-none');
            mensagemElemento.classList.add('alert', 'alert-danger');
        }
    }
}
