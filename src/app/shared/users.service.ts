import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'http://localhost:3000'; // URL base de tu backend

  private _logueado: boolean = false
  private _user: User | null = null; // Datos del usuario logueado

  constructor(private http: HttpClient) {}

  // Getter y setter para logueado
  get logueado(): boolean {
    return this._logueado;
  }

  set logueado(value: boolean) {
    this._logueado = value;
    localStorage.setItem('logueado', value.toString()); // Guardar en localStorage
  }

  // Getter y setter para user
  get user(): User | null {
    return this._user;
  }

  set user(value: User | null) {
    this._user = value;
    this.logueado = value !== null; // Cambiar logueado según el estado de user
  }

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
