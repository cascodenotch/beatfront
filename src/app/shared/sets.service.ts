import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DjSet } from '../models/dj-set';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  private apiUrl: string = 'http://localhost:3000/set';

  public arraySets: DjSet[] = [];
  
  // eugenio:
  public set: DjSet = new DjSet (142,7,"1sp","assets/Img/disc.jpeg",[]); 

  constructor(private http: HttpClient) {}

  addSet (set:DjSet){
    return this.http.post(this.apiUrl, set);
  }
  
  changeTitle(id_set: number, titulo: string){
    return this.http.put(`${this.apiUrl}/title`, { titulo: titulo, id_set: id_set });
  }

  getSet(id_set: number) {
    const httpOptions = {
      params: {
        id_set: id_set.toString(),
      }
    };
    return this.http.get(this.apiUrl, httpOptions);
  }

  getSetSongs (id_set: number){
    const httpOptions = {
      params: {
        id_set: id_set.toString(),
      }
    };
    return this.http.get(`${this.apiUrl}/songs`, httpOptions);
  }

  deleteSongfromSet(id_song: string, id_set: number){
    const httpOptions = {body: {id_song: id_song, id_set: id_set}}
    return this.http.delete(`${this.apiUrl}/song`, httpOptions);
  }

}
