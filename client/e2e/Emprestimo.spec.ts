import { test } from '@playwright/test';
import { fornecerValores } from './utils/fornecerValores.ts'

test.describe('Fornecer valores para empréstimo ', () => {

    test('Fornecer valor menor que 500', async({page}) => {
        await fornecerValores(page, '191.959.207-57', true, '499');
    });

    test('Fornecer valor maior que 50000', async({page}) => {
        await fornecerValores(page, '191.959.207-57', true, '50001');
    });

    test('Fornecer valor entre 500 e 50000', async({page}) => {
        await fornecerValores(page, '191.959.207-57', false, '1000');
    });
});