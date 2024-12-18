import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private apiUrl = 'http://localhost:3000/songs';  // Ruta del back-end
  public tokenUser: string | null=null; // Token del usuario logueado

  constructor(private http: HttpClient) { }

  getSavedSongs(token: string): Observable<any> {
    // Asegúrate de que el token sea válido antes de enviarlo
    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Pasar el token como Authorization header
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Esta función se puede usar para guardar el token cuando se recibe
  setToken(token: string): void {
    this.tokenUser = token;  // Guardamos el token en el servicio
  }
}

