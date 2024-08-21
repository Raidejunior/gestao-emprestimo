import { ClienteDTO } from '../dto/ClienteDadosFormulario';

export class VisaoCliente {
    
    cpf(desformataCPF: Function): string {
        const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
            return desformataCPF(cpf);
    }


    mostrarResultado(msg: string): void {
        document.querySelector('output')!.innerText = msg;
    }

    definirAcaoAoBuscar(funcao: Function): void {
        document.getElementById('buscar')
            ?.addEventListener('click', e => {
                e.preventDefault();
                funcao();
        });
    }

    
    obterDadosFormulario(): ClienteDTO {
        const nome = (document.querySelector('#nome') as HTMLInputElement).value;
        const cpf = (document.querySelector('#cpf') as HTMLInputElement).value;
        const dataNascimento = (document.querySelector('#data-nascimento') as HTMLInputElement).value;
        const telefone = (document.querySelector('#telefone') as HTMLInputElement).value;
        const email = (document.querySelector('#email') as HTMLInputElement).value;
        const endereco = (document.querySelector('#endereco') as HTMLInputElement).value;
        const limiteCredito = (document.querySelector('#limite-credito') as HTMLInputElement).value;
        console.log(nome)
        return new ClienteDTO(nome, cpf, dataNascimento, telefone, email, endereco, limiteCredito);
    }

    
    definirAcaoAoEnviar(funcao: Function): void {
        document.getElementById("cadastrar")
            ?.addEventListener('click', e => {
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