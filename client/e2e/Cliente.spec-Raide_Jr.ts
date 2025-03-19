import { test } from '@playwright/test';
import { cadastrarCliente } from './utils/cadastrarCliente';

test.describe('Cadastro de clientes ', () => {
    test('Tentar cadastrar um cliente sem atributo nenhum', async({page}) => {
        await cadastrarCliente(page, true, '', '', '', '', '', '', '', 'CPF inválido!');
    });

    test('Tentar cadastrar um cliente sem nome', async({page}) => {
        await cadastrarCliente(page, true, '', '12345678922', '2001-11-12', '11111', 'a@gmail.com', 'rua 6', '5000', 'nome');
    });

    test('Tentar cadastrar um cliente sem CPF', async({page}) => {
        await cadastrarCliente(page, true, 'nome', '', '2006-11-12', '11111', 'a@gmail.com', 'rua 6', '5000', 'CPF inválido!');
    });
    
    test('Tentar cadastrar um cliente com um CPF que já exista na base de dados', async({page}) => {
        await cadastrarCliente(page, true, 'nome', '12345678910', '2001-12-12', '11111', 'a@gmail.com', 'rua 6', '5000', 'CPF já cadastrado');
    });

});