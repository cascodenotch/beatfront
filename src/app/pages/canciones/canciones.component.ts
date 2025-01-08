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
  isLoading: boolean = true;

  constructor(private songService: SongsService, private setsService: SetsService, private router: Router) {}

  ngOnInit(): void {
    const token = this.songService.tokenUser;
    this.djSet = this.setsService.set;
    const currentSetId = this.djSet.id_set; // Obtener dinámicamente el ID del set actual
  
    if (token) {
      console.log("Token recibido en canciones:", token);
  
      // Llamar al servicio con el token y el setId
      this.fetchSongs(token, currentSetId);
    } else {
      console.error("Token no encontrado");
    }
  }

  fetchSongs(token: string, setId: number): void {
    const filters = {
      danceability: this.danceability,
      energy: this.energy,
      key: this.key,
      tempo: this.tempo
    };
    
    this.songService.getTracks(token, setId, this.searchText, filters).subscribe(
      (data: any) => {
        console.log('Canciones obtenidas:', data);
        this.songs = data; // Asignar las canciones al arreglo 'songs'
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener canciones:', error);
      }
    );
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
      const setId = this.djSet.id_set;
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
    const setId = this.djSet.id_set; // Obtener el setId desde un servicio o una variable
  
    if (token && setId) {
      this.fetchSongs(token, setId); // Llamar al método de búsqueda con los filtros
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
