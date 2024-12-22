import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSongData'
})
export class FormatSongDataPipe implements PipeTransform {

  transform(value: any, type: string): any {
    switch (type) {
      case 'duration':
        return this.formatDuration(value);
      case 'key':
        return this.convertKeyToPitch(value);
      case 'decimal':
        return this.formatDecimal(value);
      case 'tempo':
        return this.formatTempo(value);  // Añadido el caso para 'tempo'
      default:
        return value;
    }
  }

// Función para formatear la duración en milisegundos a minutos:segundos
  private formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${(parseInt(seconds) < 10 ? '0' : '') + seconds}`;
  }

  // Función para convertir el valor de 'key' a notación musical
  private convertKeyToPitch(key: number): string {
    if (key === null || key === undefined || key === -1) {
      return "";  // Devuelve un valor predeterminado si key es null, undefined o -1
    }
    const pitches = [
      "C", "C#", "D", "D#", "E", "F", "F#", 
      "G", "G#", "A", "A#", "B"
    ];
    return pitches[key % 12];
  }

  // Función para redondear a dos decimales

  private formatDecimal(value: number): number {
    // Verificación adicional antes de aplicar toFixed
    if (value !== null && value !== undefined && !isNaN(value)) {
      return parseFloat(value.toFixed(2));
    } else {
      return 0;  // Valor por defecto
    }
  }

  // Función para quitar decimales

  private formatTempo(tempo: number): number {
    return tempo ? Math.round(tempo) : 0;  // Redondea tempo a un número entero si es válido
  }

}
