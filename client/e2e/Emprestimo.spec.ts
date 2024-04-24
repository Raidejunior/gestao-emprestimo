import { test } from '@playwright/test';
import { fornecerValores } from './utils/fornecerValores.ts';
import { verificarParcelas } from './utils/verificarParcelas.ts';
import { solicitarEmprestimo } from './utils/solicitarEmprestimo.ts';

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

test.describe('Fornecer valor e selecionar forma de pagamento ', () => {

    test('Fornecer valor de 1000 com 6 parcelas e 10% de juros', async({page}) => {
        await verificarParcelas(page, '191.959.207-57', '1000', '2', '6', '183,34', '183,33', '1.100,00');
    });

    test('Fornecer valor de 3333 com 6 parcelas e 10% de juros', async({page}) => {
        await verificarParcelas(page, '191.959.207-57', '3333', '2', '6', '611,05', '611,05', '3.666,30');
    });

    test('Fornecer valor de 6007 com 12 parcelas e 22% de juros', async({page}) => {
        await verificarParcelas(page, '191.959.207-57', '6007', '3', '12', '610,72', '610,71', '7.328,54');
    });

    test('Fornecer valor de 44567 com 12 parcelas e 22% de juros', async({page}) => {
        await verificarParcelas(page, '191.959.207-57', '44567', '3', '12', '4.530,98', '4.530,97', '54.371,74');
    });
});

test.describe('Realizar empréstimo ', () => {

    test('Realizar empréstimo de 44567 com 12 parcelas e 22% de juros', async({page}) => {
        await solicitarEmprestimo(page, '191.959.207-57', '44567', '3', '54.371,74', '44.567,00', 'Cliente 1');
    });

    test('Realizar empréstimo de 11122 com 6 parcelas e 10% de juros', async({page}) => {
        await solicitarEmprestimo(page, '123.456.789-10', '11122', '2', '12.234,20', '11.122,00', 'Cliente 2');
    });

    test('Realizar empréstimo de 33333 com 12 parcelas e 22% de juros', async({page}) => {
        await solicitarEmprestimo(page, '123.456.789-10', '33333', '3', '40.666,26', '33.333,00', 'Cliente 2');
    });
});