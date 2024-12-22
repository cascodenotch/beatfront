import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DjSet } from '../models/dj-set';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  private apiUrl: string = 'http://localhost:3000/set';

  public arraySets: DjSet[] = [];
  
  public set: DjSet = new DjSet (0,0,"","assets/Img/disc.jpeg",[]); 

  constructor(private http: HttpClient) {}

  addSet (set:DjSet){
    return this.http.post(this.apiUrl, set);
  }
  
  changeTitle(id_set: number, titulo: string){
    return this.http.put(`${this.apiUrl}/title`, { titulo: titulo, id_set: id_set });
  }
  getSet(id_set: number) {
    const httpOptions = { params: { id_set: id_set.toString() } };
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
  getSetsByUser(id_user: number) {
    return this.http.get(`${this.apiUrl}/${id_user}`);
  }
  

  deleteSongfromSet(id_song: string, id_set: number){
    const httpOptions = {body: {id_song: id_song, id_set: id_set}}
    return this.http.delete(`${this.apiUrl}/song`, httpOptions);
  }

  addSongToSet(setId: number, songId: string) {
    const body = { setId, songId };
    console.log("haciendo solicitud a la api");
    return this.http.post(`${this.apiUrl}/song`, body);  
  }

  deleteSet(id_set: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_set}`);
  }
  
  reorderSongs(id_set: number, rangeStart: number, insertBefore: number, orderedSongIds: string []) {
    const body = { id_set: id_set.toString(), rangeStart: rangeStart, insertBefore: insertBefore, songs: orderedSongIds };
    return this.http.put(`${this.apiUrl}/songs`, body);
}
  
}