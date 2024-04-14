import { describe, it, expect } from 'vitest';

import { Cliente } from '../src/models/Cliente';

describe('Cliente', () => {
    
    describe('validarCPF', () => {
        
        it('Retorna falso ao receber uma string que contenha um comprimento diferente de 11 caracteres' , () => {
            const cpf = '123456';
            const cliente = new Cliente({nome: 'teste', cpf, dataNascimento: new Date()});
            
            expect(cliente.validarCPF()).toBe(false);
        });

        it('Retorna falso ao receber uma string que não contenha somente números' , () => {
            const cpf = '1abc234ghji';
            const cliente = new Cliente({nome: 'teste', cpf, dataNascimento: new Date()});
            
            expect(cliente.validarCPF()).toBe(false);
        });

    })
})