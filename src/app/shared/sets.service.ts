import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DjSet } from '../models/djset';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  private apiUrl: string = 'http://localhost:3000/set';

  public arraySets: DjSet[] = [];

  constructor(private http: HttpClient) {}

  addSet (set:DjSet){
    return this.http.post(this.apiUrl, set);
  }
  
}
