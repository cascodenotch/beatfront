import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Set } from '../models/set';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  private apiUrl: string = 'http://localhost:3000/set';

  constructor(private http: HttpClient) { }

  addSet (set:Set){
    return this.http.post(this.apiUrl, set)
  }
}
