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

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión con un usuario
  public login(user: User): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }

  // Método PUT para obtener los datos del usuario usando el token
  public putUser(token: string): Observable<any> {
    return this.http.put(`${this.url}/user`, { token });
  }

  public getCurrentUserId(): number | null {
    return this.user ? this.user.id_user : null;
  }

}
