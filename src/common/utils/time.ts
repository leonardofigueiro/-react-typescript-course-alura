export function tempoParaSegundos(tempo: string): number {
    const [horas = '0', minutos = '0', segundos = '0'] = tempo.split(":");

    const horasSegundos = Number(horas) * 3600;
    const minutosSegundos = Number(minutos) * 60;
    return horasSegundos + minutosSegundos + Number(segundos);
}