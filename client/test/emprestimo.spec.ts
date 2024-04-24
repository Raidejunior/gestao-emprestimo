import { describe, it, expect } from 'vitest';

import { Emprestimo } from '../src/models/Emprestimo.ts';
import { FormaPagamento } from '../src/models/FormaPagamento.ts';

describe('Emprestimo', () => {

    describe('CalcularParcelas', () => {

        it('Retorna 3 parcelas de R$110 quando recebe um valor de R$ 300 a uma taxa de juros de 10% e 3 parcelas', () => {
            const valorPedidoEmprestimo = 300
            const juros = 10;
            const parcelas = 3;
            const valorPgEmprestimo = 330.00;

            const formaPagamento = new FormaPagamento(0, 'Forma 1', parcelas, juros);
            const emprestimo = new Emprestimo(valorPedidoEmprestimo, formaPagamento);
            emprestimo.calculaParcelas();

            expect(emprestimo.parcelas![0].valor).toBe(110);
            expect(emprestimo.parcelas![1].valor).toBe(110);
            expect(emprestimo.parcelas![2].valor).toBe(110);

            expect(emprestimo.valorPagoEmprestimo).toBe(valorPgEmprestimo);
        });

        it("Retorna 2 parcelas de R$336,67 e 1 parcela de R$336,66 \
            quando recebe um valor de R$ 1000 a uma taxa de juros de 10% e 3 parcelas", () => {
            const valorPedidoEmprestimo = 1000;
            const juros = 10;
            const parcelas = 3;
            const valorPgEmprestimo = 1100;

            const formaPagamento = new FormaPagamento(0, 'Forma 1', parcelas, juros);
            const emprestimo = new Emprestimo(valorPedidoEmprestimo, formaPagamento);
            emprestimo.calculaParcelas();

            expect(emprestimo.parcelas![0].valor).toBe(366.67);
            expect(emprestimo.parcelas![1].valor).toBe(366.67);
            expect(emprestimo.parcelas![2].valor).toBe(366.66);

            expect(emprestimo.valorPagoEmprestimo).toBe(valorPgEmprestimo);

        });

        it("Retorna 2 parcelas de R$398,48 e 2 parcelas de R$398,47 \
            quando recebe um valor de R$ 1265 a uma taxa de juros de 26% e 4 parcelas", () => {
            const juros = 26;
            const parcelas = 4;
            const valorPedidoEmprestimo = 1265;
            const valorPgEmprestimo = 1593.9;

            const formaPagamento = new FormaPagamento(0, 'Forma 1', parcelas, juros);
            const emprestimo = new Emprestimo(valorPedidoEmprestimo, formaPagamento);
            emprestimo.calculaParcelas();

            expect(emprestimo.parcelas![0].valor).toBe(398.48);
            expect(emprestimo.parcelas![1].valor).toBe(398.48);
            expect(emprestimo.parcelas![2].valor).toBe(398.47);
            expect(emprestimo.parcelas![2].valor).toBe(398.47);
            
            expect(emprestimo.valorPagoEmprestimo).toBe(valorPgEmprestimo);

        });
    });

    describe('verificarValorEmprestimo', () => {

        it('Retorna false para um valor menor que 500', () => {
            const valor = 499;
            expect(Emprestimo.verificarValorEmprestimo(valor)).toBeFalsy();
        });

        it('Retorna true para um valor entre 500 e 50000', () => {
            const valor = 20000;
            expect(Emprestimo.verificarValorEmprestimo(valor)).toBeTruthy();
        });

        it('Retorna false para um valor maior que 50000', () => {
            const valor = 50001;
            expect(Emprestimo.verificarValorEmprestimo(valor)).toBeFalsy();
        });
    });

})