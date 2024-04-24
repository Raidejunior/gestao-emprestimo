import { expect} from "@playwright/test";

export async function fornecerValores( page, cpf, erro, valor ) {
    // Acesso a tela de busca de cliente por cpf
    await page.goto('http://localhost:5173/');
    // Quando eu informo um valor para o cpf
    await page.fill('#cpf', cpf);
    // Clico no botão para buscar cliente por cpf
    await page.click('#buscar');
    // Digito o valor do empréstimo
    await page.fill('#valor', valor);
    // preciono Enter
    await page.keyboard.press('Enter');
    // Então verifico se a classe do componente é a correta
    const classe = 'div-aviso-valor-color-red';
    if(erro) {
        await expect(page.locator('.form-text')).toHaveCSS('color', 'rgb(255, 0, 0)'); // em caso de erro, a div fica com a cor vermelha
        return;
    }
    await expect(page.locator('.form-text')).not.toHaveCSS('color', 'rgb(255, 0, 0)');
 }