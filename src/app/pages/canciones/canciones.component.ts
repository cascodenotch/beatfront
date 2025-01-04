import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../shared/songs.service';
import { SetsService } from 'src/app/shared/sets.service';
import { Router } from '@angular/router';
import { DjSet } from 'src/app/models/dj-set';

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
  selectedSongId: string = "";
  showValidation = false; // Controla si se muestra el modal
  spotifyUrl: string | null = null;  // Agrega esta propiedad
  djSet = new DjSet(0, 0, '', '', [],'');

  constructor(private songService: SongsService, private setsService: SetsService, private router: Router) {}

  ngOnInit(): void {
    const token = this.songService.tokenUser;
    this.djSet = this.setsService.set;
    const currentSetId = this.djSet.id_set; // Aquí debes obtener dinámicamente el ID del set actual (ejemplo estático)
  
    if (token) {
      console.log("Token recibido en canciones:", token);
  
      // Llamar al servicio con el token y el setId
      this.songService.getSavedSongs(token, currentSetId).subscribe(
        (data: any) => {
          console.log('Canciones obtenidas:', data);
          this.songs = data; // Asignar las canciones al arreglo 'songs'
        },
        (error) => {
          console.error('Error al obtener canciones:', error);
        }
      );
    } else {
      console.error("Token no encontrado");
    }
  }
  
  onAddSongToSet(songId: string) {
    this.selectedSongId = songId; // Asignamos el songId cuando se hace clic en "Añadir"
    this.showValidation = true; // Mostramos el modal de validación
    console.log("Song ID recibido:", songId);
  }

  // Recibe el evento de cierre del modal
  closeVal() {
    this.showValidation = false; // Cerrar el modal
    console.log("Modal cerrado");
  }

  // Confirmar y añadir la canción al set
  onConfirmAdd(songId: string) {
    console.log('Añadiendo canción con ID:', songId);
    this.confirmAddSongToSet(songId); // Llamar a la función que maneja la adición de la canción al set
    //this.router.navigate(['/editar-set']); 
  }

  // Llamada al servicio para añadir la canción al set
  confirmAddSongToSet(songId: string): void {
    if (songId !== null) {
      this.djSet = this.setsService.set;
      const setId = this.djSet.id_set// Aquí debes obtener el setId desde la página o un servicio
      this.setsService.addSongToSet(setId, songId).subscribe(
        response => {
          console.log('Canción añadida con éxito:', response);
          // Eliminar la canción del arreglo 'songs'
          this.songs = this.songs.filter(song => song.songId !== songId);
          console.log('Canción eliminada de la lista');
          this.showValidation = false; // Cerrar el modal
        },
        error => {
          console.error('Error al añadir la canción:', error);
        }
      );
    }
  }

  search(): void {
    const token = this.songService.tokenUser;
    this.djSet = this.setsService.set;
    const setId = this.djSet.id_set // Reemplaza con el setId actual desde un servicio o una variable
  
    if (token && setId) {
      // Si no hay texto en el campo de búsqueda, se obtienen las canciones guardadas
      if (!this.searchText) {
        this.songService.getSavedSongs(token, setId).subscribe(
          (data: any) => {
            console.log('Canciones obtenidas al no buscar:', data);
            this.songs = data; // Asignar las canciones obtenidas en ngOnInit
          },
          (error) => {
            console.error('Error al obtener las canciones:', error);
          }
        );
      } else {
        // Si hay texto, se realiza la búsqueda
        this.songService.searchSongs(this.searchText, token, setId).subscribe(
          (data: any) => {
            console.log('Resultados de la búsqueda:', data);
            this.songs = data; // Actualiza las canciones con los resultados de la búsqueda
          },
          (error) => {
            console.error('Error al realizar la búsqueda:', error);
          }
        );
      }
    } else {
      console.error("Token, texto de búsqueda o setId no proporcionados");
    }
  }
  
  onPlaySong(songId: string) {
    console.log("Reproduciendo canción con ID: ", songId);
    
    // Llama a la API de tu backend para obtener la URL de reproducción de la canción
    this.songService.getSpotifyTrackUrl(songId).subscribe(
      (data: any) => {
        console.log('URL de la canción:', data.url);
        
        // Agregar el parámetro autoplay=true a la URL para habilitar la reproducción automática
        this.spotifyUrl = data.url + '?autoplay=true';  // Añadir el parámetro de autoplay
        
        // Guardar la URL de la canción para reproducirla automáticamente
      },
      (error) => {
        console.error('Error al obtener la URL de la canción:', error);
      }
    );
  }
  
  
  
}
