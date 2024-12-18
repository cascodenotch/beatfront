import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'http://localhost:3000'; // URL base de tu backend

  public logueado: boolean = false; // Indica si el usuario está logueado
  public user: User | null = null; // Datos del usuario logueado
  public id_user: number | null = null; // ID del usuario logueado

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  public register(user: User): Observable<any> {
    return this.http.post(`${this.url}/registro`, user);
  }

  // Método para iniciar sesión con un usuario
  public login(user: User): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }

  // Método para modificar los datos del usuario
  public modUser(user: User): Observable<any> {
    return this.http.put(`${this.url}/user`, user);
  }

  // Método para obtener datos del usuario
public getUser(spotifyId: string): Observable<User> {
  return this.http.get<User>(`${this.url}/user?spotifyId=${spotifyId}`);
}

}
