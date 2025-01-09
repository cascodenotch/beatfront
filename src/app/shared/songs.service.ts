import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Importa el operador 'map'
import { Song } from '../models/song';  

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private apiUrl = 'https://beatback-cascodenotchs-projects.vercel.app/songs';  // Ruta del back-end
  public tokenUser: string | null = null; // Token del usuario logueado

  constructor(private http: HttpClient) { }

  getTracks(
    token: string,
    setId: number,
    query: string = '',
    filters: any = {}
  ): Observable<Song[]> {
    if (!token) {
      throw new Error('Token no proporcionado');
    }
  
    if (!setId) {
      throw new Error('Set ID no proporcionado');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url = `${this.apiUrl}/tracks?setId=${setId}`;
  
    // Agregar el término de búsqueda si está presente
    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }
  
    // Agregar filtros opcionales a la URL
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        url += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });
  
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data: any[]) =>
        data.map(
          (item: any) =>
            new Song(
              item.albumImage,       // Imagen del álbum
              item.artistName,       // Nombre del artista
              this.formatDuration(item.durationMs), // Formato de duración
              item.songId,           // ID de la canción
              item.songName,         // Nombre de la canción
              item.danceability,     // Danceability
              item.energy,           // Energía
              item.tempo,            // Tempo
              item.key               // Key
            )
        )
      )
    );
  }
  

  
  getSpotifyTrackUrl(songId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenUser}`);  // Usar el token guardado
    const url = `${this.apiUrl}/track/${songId}`;  // URL de tu API backend que maneja la integración con Spotify

    return this.http.get<any>(url, { headers });
  }


  // Función para formatear la duración en milisegundos a un formato adecuado (minutos:segundos)
  private formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${(parseInt(seconds) < 10 ? '0' : '') + seconds}`;
  }

  // Función para guardar el token cuando se recibe
  setToken(token: string): void {
    this.tokenUser = token;
  }

  getRecommendations(setId: number): Observable<Song[]> {
    if (!setId) {
      throw new Error('Set ID no proporcionado');
    }
  
    if (!this.tokenUser) {
      throw new Error('Token no disponible');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenUser}`);
    const url = `${this.apiUrl}/recomend/${setId}`; // Único endpoint para recomendaciones
  
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data: any[]) =>
        data.map(item => new Song(
          item.albumImage,        // Imagen del álbum
          item.artistName,        // Nombre del artista
          this.formatDuration(item.durationMs), // Duración formateada
          item.songId,            // ID de la canción
          item.songName,          // Nombre de la canción
          item.danceability,      // Danceabilidad
          item.energy,            // Energía
          item.tempo,             // Tempo
          item.key                // Key
        ))
      )
    );
  }
  

}
