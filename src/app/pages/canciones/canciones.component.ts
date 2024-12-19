import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../shared/songs.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  searchText: string = '';
  danceability: string = '';
  energy: string = '';
  key: string = '';
  tempo: string = '';
  songs: any[] = [];  // Arreglo de canciones

  constructor(private songService: SongsService) {}

  ngOnInit(): void {
    const token = this.songService.tokenUser;  // Verifica que el token esté disponible en el servicio

    if (token) {
      console.log("Token recibido en canciones:", token);

      // Llamar al servicio para obtener las canciones guardadas inicialmente
      this.songService.getSavedSongs(token).subscribe(
        (data: any) => {
          console.log('Canciones obtenidas:', data);
          this.songs = data;  // Asignar las canciones al arreglo 'songs'
        },
        (error) => {
          console.error('Error al obtener canciones:', error);
        }
      );
    } else {
      console.error("Token no encontrado");
    }
  }

  search(): void {
    const token = this.songService.tokenUser;

    if (token && this.searchText) {
      this.songService.searchSongs(this.searchText, token).subscribe(
        (data: any) => {
          console.log('Resultados de la búsqueda:', data);
          this.songs = data;  // Actualiza las canciones con los resultados de la búsqueda
        },
        (error) => {
          console.error('Error al realizar la búsqueda:', error);
        }
      );
    } else {
      console.error("Token no encontrado o texto de búsqueda vacío");
    }
  }
}
