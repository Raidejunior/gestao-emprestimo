export function formataValorParaReais(numero: number): string {
    const valor = Number(numero.toFixed(2));
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
