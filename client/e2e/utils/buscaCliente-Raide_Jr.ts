import { expect} from "@playwright/test";
import { HOST } from "./HOST";


export async function buscaCliente( page, cpf, mensagemEsperada ) {
   // Acesso a tela de login
   await page.goto(HOST);
   // Digito um usuário e senha válidos e entro no sistema
   await page.fill('#login', 'funcionario');
   await page.fill('#senha', '123456');
   await page.click('#entrar');
   // Acesso a tela de busca de cliente por cpf
   await page.click('a[href="#formulario-emprestimo"]');
   // Quando eu informo um valor para o cpf
   await page.fill('#cpf', cpf);
   // Clico no botão para buscar cliente por cpf
   await page.click('#buscar');
   // Então vejo na tela a mensagem correspondente ao valor do cpf informado.
   await expect(page.locator('.info-cliente')).toContainText(mensagemEsperada);
}