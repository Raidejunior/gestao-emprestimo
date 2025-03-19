export function AdicionarBtnVoltar() {
    document.getElementById('conteudo')!.innerHTML += `
        <div id="divBtnVoltar">
            <a class="btn btn-large" id="btnVoltar">Voltar</a>
        </div>
    `
    document.getElementById("btnVoltar")!.addEventListener('click', function() {
        window.history.back(); // Volta uma página no histórico
    });
}