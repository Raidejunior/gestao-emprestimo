import { expect} from "@playwright/test";
import { HOST } from "./HOST";

export async function solicitarEmprestimo( page, cpf, valor, opcao, valorASerPago, valorSolicitado,
    nomeCliente){
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
    // Digito o valor do empréstimo
    await page.fill('#valor', valor);
    // Seleciono a forma de pagamento
    // await page.keyboard.press('Tab');
    // await page.keyboard.press('Enter');
    await page.selectOption('#formas-pagamento', { label: `${opcao} meses` })
    // for(let i = 0; i < Number(opcao) - 1; i++ ){
    //     await page.keyboard.press('ArrowDown');
    // }
    // await page.keyboard.press('Enter');
    // Clico em realizar emprestimo
    await page.click('#realizar-emprestimo');
    // Verifico se os valores de nome e valor total estão corretos
    await expect(page.locator('#nome-cliente')).toContainText(nomeCliente);
    await expect(page.locator('#valor-parcela')).toContainText(valorSolicitado);
    // Realizo o empréstimo
    await page.click('#confirmar-emprestimo');
    // Visualizo a lista de empréstimos
    await page.click('#buscar-emprestimos');
    // vou até a página de listagem de empréstimos
    await page.goto(HOST + '#emprestimos');
    // Então verifico se o empréstimo foi salvo
    await expect(page.locator('tbody tr:nth-child(1) td:nth-child(2)')).toContainText(nomeCliente);
    await expect(page.locator('tbody tr:nth-child(1) td:nth-child(3)')).toContainText(valorSolicitado);
    await expect(page.locator('tbody tr:nth-child(1) td:nth-child(6)')).toContainText(valorASerPago);
}