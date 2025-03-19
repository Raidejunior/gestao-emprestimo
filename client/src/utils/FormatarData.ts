export function formatarData(data: string | null): string | null {
    if(! data) {
        return null;
    }

    const [ano, mes, dia] = data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada;
}