import { test } from '@playwright/test';
import { buscaCliente } from './utils/buscaCliente';

test.describe('Informa CPF ', () => {
    test('Encontrar cliente cadastrado', async({page}) => {
        await buscaCliente(page, '191.959.207-57', 'Cliente 1, 15 anos');
    });

    test('Exibe mesagem para preencher o campo para cpf vazio', async({page}) => {
        await buscaCliente(page, '', 'CPF inválido!');
    });

    test('Exibe mensagem de erro para um cliente não cadastrado', async({page}) => {
        await buscaCliente(page, '292.959.307-67', 'Erro ao buscar cliente');
    });
});