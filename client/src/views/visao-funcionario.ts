import { FuncionarioParaCadastro } from "../dto/FuncionarioParaCadastro";

export class VisaoFuncionario {

    obterNome(): string {
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        return nome.trim();
    }

    obterLogin(): string {
        const login = (document.getElementById('login') as HTMLInputElement).value;
        return login.trim();
    }

    obterEmail(): string {
        const email = (document.getElementById('email') as HTMLInputElement).value;
        return email.trim();
    }

    obterSenha(): string {
        const senha = (document.getElementById('senha') as HTMLInputElement).value;
        return senha;
    }

    obterPermissao(): string {
        const select = document.getElementById('permissao') as HTMLSelectElement;
        const permissao = select.options[select.selectedIndex].value;
        return permissao;
    }

    obterDadosFormularioCadastro(): FuncionarioParaCadastro {
        const nome = this.obterNome();
        const login = this.obterLogin();
        const email = this.obterEmail();
        const senha = this.obterSenha();
        const permissao = this.obterPermissao();
        return new FuncionarioParaCadastro(nome, login, email, senha, Number(permissao));
    }

    definirAcaoAoCadastrarFuncionario(funcao: Function): void {
        document.getElementById('cadastrar')?.addEventListener('click', (e) => {
            e.preventDefault();
            funcao();
        });
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