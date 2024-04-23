import { describe, it, expect } from 'vitest';

import { Cliente } from '../src/models/Cliente';

describe('Cliente', () => {
    
    describe('validarCPF', () => {
        
        it('Retorna falso ao receber uma string que contenha um comprimento diferente de 11 caracteres' , () => {
            const cpf = '123456';
            
            expect(Cliente.isCPFValido(cpf)).toBe(false);
        });

        it('Retorna falso ao receber uma string que não contenha somente números' , () => {
            const cpf = '1abc234ghji';
            
            expect(Cliente.isCPFValido(cpf)).toBe(false);
        });

    });

    describe('converterData', () => {

        it('Retorna um objeto Date com a data de 01/03/2019 quando recebe um valor de "2019-03-01"', () => {
            const data = '2019-03-01';
            const cliente = new Cliente(0, 'cliente 1', '12345678910', data);

            expect(cliente.dataNascimento.getUTCDate()).toBe(1);
            expect(cliente.dataNascimento.getMonth() + 1).toBe(3); // Meses começam com 0 em JS
            expect(cliente.dataNascimento.getFullYear()).toBe(2019);
        });

        it('Retorna um objeto Date com a data de 04/07/2017 quando recebe um valor de "2017-07-04"', () => {
            const data = '2017-07-04';
            const cliente = new Cliente(0, 'cliente 1', '12345678910', data);

            expect(cliente.dataNascimento.getUTCDate()).toBe(4);
            expect(cliente.dataNascimento.getMonth() + 1).toBe(7);
            expect(cliente.dataNascimento.getFullYear()).toBe(2017);
        });
    });

    describe('getIdade', () => {
         
        it('Retorna 15 quando é passado como parâmetro uma pessoa que nasceu em 01/01/2008, sendo que a data atual é 01/01/2023', () => {
            const dataNascimento = '2008-01-01';
            const dataAtualSimulada = '2023-01-01';
            const cliente = new Cliente(0, 'Cliente 1', '12345678910', dataNascimento);

            expect(cliente.getIdade(dataAtualSimulada)).toBe(15);
        });

        it('Retorna 20 quando é passado como parâmetro uma pessoa que nasceu em há 20 anos, sendo que a data atual é o dia de hoje', () => {
            let hoje = new Date();
            hoje.setHours(hoje.getHours() - 3); // ajustando para o horário de Brasília 
            const dataNascimento = `${hoje.getFullYear() - 20}-${hoje.getMonth() + 1}-${hoje.getUTCDate()}`;
            console.log(dataNascimento);
            const cliente = new Cliente(0, 'Cliente 1', '12345678910', dataNascimento);

            expect(cliente.getIdade()).toBe(20); // Quando nenhuma data específica é passada, o dia atual é assumido para calcular a idade
        });

    });
})