import { expect} from "@playwright/test";
import { HOST } from "./HOST";

export async function cadastrarCliente( page, erro ,nome = '', cpf ='', dtNascimento = '', telefone = '',
    email = '', endereco = '', limiteCredito = '', mensagem = "Erro") {
    // Acesso a tela de login
    await page.goto(HOST);
    // Digito um usuário e senha válidos e entro no sistema
    await page.fill('#login', 'funcionario');
    await page.fill('#senha', '123456');
    await page.click('#entrar');
    // Acesso a tela de cadastro de cliente
    await page.click('a[href="#cadastro-cliente"]');
    //forneço os dados do cliente
    await page.fill('#nome', nome);
    await page.fill('#cpf', cpf);
    await page.fill('#data-nascimento', dtNascimento);
    await page.fill('#telefone', telefone);
    await page.fill('#email', email);
    await page.fill('#endereco', endereco);
    await page.fill('#limite-credito', limiteCredito);
    // pressiono Enter
    await page.keyboard.press('Enter');
    // e verifico a condição
    if(erro) {
        await expect(page.locator('#mensagemErro')).toContainText(mensagem);
    } else {
        await expect(page.locator('#mensagemSucesso')).toContainText('Sucesso');
    }
}