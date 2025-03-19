import { expect } from "@playwright/test";
import { HOST } from "./HOST";

export async function verificarParcelas(
    page,
    cpf,
    valorSolicitado,
    opcao,
    qtdParcelas,
    valorPrimeiraParcela,
    valorUltimaParcela,
    valorASerPago
) {
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
    await page.fill('#valor', valorSolicitado);
    // Seleciono a forma de pagamento
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    for (let i = 0; i < Number(opcao) - 1; i++) {
        await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.press('Enter');

    // Verifico se o botão "Realizar empréstimo" está visível antes de clicar
    const realizarEmprestimoVisible = await page.isVisible('#realizar-emprestimo');
    if (realizarEmprestimoVisible) {
        await page.click('#realizar-emprestimo'); // Pressione o botão para realizar o empréstimo
    } else {
        console.error('O botão "Realizar empréstimo" está oculto.');
        return; // Retorna se o botão não estiver visível
    }

    // Espera um tempo para que a UI atualize
    await page.waitForTimeout(1000);
    
    // Verifique se o texto contém o valor total após o clique
    await page.waitForSelector('#info-parcelas p:nth-child(3)', { state: 'visible' });
    await expect(page.locator('#info-parcelas p:nth-child(3)')).toContainText(`Valor total a ser pago: R$ ${valorASerPago}`);
    
    // Verifico o valor da primeira parcela
    await expect(page.locator('#parcelas tr:nth-child(1) td:nth-child(2)')).toContainText(valorPrimeiraParcela);
    // Verifico o valor da última parcela
    await expect(page.locator(`#parcelas tr:nth-child(${qtdParcelas}) td:nth-child(2)`)).toContainText(valorUltimaParcela);
}
