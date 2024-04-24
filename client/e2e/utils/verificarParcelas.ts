import { expect} from "@playwright/test";

export async function verificarParcelas( page, cpf, valorSolicitado, opcao, qtdParcelas, valorPrimeiraParcela
    , valorUltimaParcela, valorASerPago ) {
    // Acesso a tela de busca de cliente por cpf
    await page.goto('http://localhost:5173/');
    // Quando eu informo um valor para o cpf
    await page.fill('#cpf', cpf);
    // Clico no botão para buscar cliente por cpf
    await page.click('#buscar');
    // Digito o valor do empréstimo
    await page.fill('#valor', valorSolicitado);
    // Seleciono a forma de pagamento
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    for(let i = 0; i < Number(opcao) - 1; i++ ){
        await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.press('Enter');
    // Verifico o valor total a ser pago
    await expect(page.locator('#info-parcelas p:nth-child(3)')).toContainText(valorASerPago);
    // Verifico o valor da primeira parcela
    await expect(page.locator('#parcelas tr:nth-child(1) td:nth-child(2)')).toContainText(valorPrimeiraParcela);
    // Verifico o valor da última parcela
    await expect(page.locator(`#parcelas tr:nth-child(${qtdParcelas}) td:nth-child(2)`)).toContainText(valorUltimaParcela);
}