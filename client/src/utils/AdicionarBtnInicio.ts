export function AdicionarBtnInicio() {
    document.getElementById('conteudo')!.innerHTML += `
        <div>
            <a class="btn btn-large" id="btnInicio" href="#home">Início</a>
        </div>
    `
    document.getElementById("btnInicio")!.addEventListener('click', function() {
        window.location.hash = 'home';
    });
}