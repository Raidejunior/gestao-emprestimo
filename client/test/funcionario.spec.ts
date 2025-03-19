import { describe, it, expect } from 'vitest';
import { Funcionario } from '../src/models/Funcionario';


describe('Funcionario', () => {

    describe('Verificar permissão', () => {

        it('Retorna falso caso uma permissao não seja válida', () => {
            const permissao = 'A';

            expect(Funcionario.verificaPermissaoValida(permissao)).toBeFalsy();
        });

        it('Retorna falso caso uma permissao nula', () => {
            const permissao = null;

            expect(Funcionario.verificaPermissaoValida(permissao)).toBeFalsy();
        });

        it('Retorna verdadeiro caso uma permissao seja valida', () => {
            const permissao = 1;

            expect(Funcionario.verificaPermissaoValida(permissao)).toBeTruthy();
        });
    });
});