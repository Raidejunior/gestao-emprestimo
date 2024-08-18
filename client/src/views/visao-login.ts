export class VisaoLogin {

    login(): string{
        const login = (document.getElementById("login") as HTMLInputElement).value;
        return login;
    }

    senha(): string{
        const senha = (document.getElementById("senha") as HTMLInputElement).value;
        return senha;
    }

    definirHash(): void {
        window.location.hash = 'login';
    }

    definirAcaoAoEntrar(funcao: Function): void {
        //console.log(document.body.innerHTML);
        document.getElementById('entrar')
        ?.addEventListener('click', e => {
            e.preventDefault();
            funcao();
        });
    }
}
