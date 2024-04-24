import { expect} from "@playwright/test";

export async function buscaCliente( page, cpf, mensagemEsperada ) {
   // Acesso a tela de busca de cliente por cpf
   await page.goto('http://localhost:5173/');
   // Quando eu informo um valor para o cpf
   await page.fill('#cpf', cpf);
   // Clico no botão para buscar cliente por cpf
   await page.click('#buscar');
   // Então vejo na tela a mensagem correspondente ao valor do cpf informado.
   await expect(page.locator('.info-cliente')).toContainText(mensagemEsperada);
}