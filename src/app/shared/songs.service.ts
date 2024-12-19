import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Importa el operador 'map'
import { Song } from '../models/song';  // Asegúrate de importar el modelo

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private apiUrl = 'http://localhost:3000/songs';  // Ruta del back-end
  public tokenUser: string | null = null; // Token del usuario logueado

  constructor(private http: HttpClient) { }

  getSavedSongs(token: string, setId: number): Observable<Song[]> {
    if (!token) {
      throw new Error('Token no proporcionado');
    }
  
    if (!setId) {
      throw new Error('Set ID no proporcionado');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Pasar el token como Authorization header
    const url = `${this.apiUrl}?setId=${setId}`; // Agregar el setId como parámetro de consulta
  
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data: any[]) => { // Procesar el arreglo de canciones
        return data.map((item: any) => new Song(
          item.albumImage,      // Imagen del álbum
          item.artistName,      // Nombre del artista
          this.formatDuration(item.durationMs),  // Formato de duración
          item.songId,          // ID de la canción
          item.songName         // Nombre de la canción
        ));
      })
    );
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

  searchSongs(query: string, token: string, setId: number, filters: any = {}): Observable<Song[]> {
    if (!query || !token || !setId) {
      throw new Error('Query, token o setId no proporcionados');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url = `${this.apiUrl}/search?query=${encodeURIComponent(query)}&setId=${setId}`;
  
    // Agregar filtros opcionales a la URL
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        url += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });
  
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data: any[]) => data.map(item => new Song(
        item.albumImage,       // Imagen del álbum
        item.artistName,       // Nombre del artista
        this.formatDuration(item.durationMs), // Formato de duración
        item.songId,           // ID de la canción
        item.songName          // Nombre de la canción
      )))
    );
  }
  
  
}
