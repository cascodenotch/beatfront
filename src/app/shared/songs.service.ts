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

  getSavedSongs(token: string): Observable<Song[]> {
    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Pasar el token como Authorization header
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map((data: any[]) => {  // Especifica el tipo de 'data' como arreglo de objetos
        return data.map((item: any) => new Song(  // Especifica el tipo de 'item'
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

  searchSongs(query: string, token: string, filters: any = {}): Observable<Song[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url = `${this.apiUrl}/search?query=${encodeURIComponent(query)}`;
  
    // Agregar filtros opcionales a la URL
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        url += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });
  
    return this.http.get<any>(url, { headers }).pipe(
      map((data: any[]) => data.map(item => new Song(
        item.albumImage,
        item.artistName,
        this.formatDuration(item.durationMs),
        item.songId,
        item.songName
      )))
    );
  }
  
}
