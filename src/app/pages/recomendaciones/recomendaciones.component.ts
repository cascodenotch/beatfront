import { Component } from '@angular/core';
import { SongsService } from '../../shared/songs.service';
import { SetsService } from 'src/app/shared/sets.service';
import { Router } from '@angular/router';
import { DjSet } from 'src/app/models/dj-set';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {

  constructor(private songService: SongsService, private setsService: SetsService, private router: Router) {}

  songs: any[] = [];  // Arreglo de canciones
  selectedSongId: string = "";
  showValidation = false; // Controla si se muestra el modal
  spotifyUrl: string | null = null;  // Agrega esta propiedad
  djSet = new DjSet(0, 0, '', '', [],'');
  recommendations: any[] = []; // Almacena las canciones recomendadas

  ngOnInit(): void {
    const currentSetId = this.setsService.set.id_set;

    if (currentSetId) {
      // Obtener canciones del set
      this.setsService.getSetSongs(currentSetId).subscribe(
        (response: any) => {
          this.songs = response.songs;
          console.log('Canciones del set:', this.songs);

          // Obtener recomendaciones basadas en las canciones del set
          this.getRecommendations(currentSetId);
        },
        (error) => {
          console.error('Error al obtener canciones del set:', error);
        }
      );
    } else {
      console.error('ID del set no encontrado');
    }
  }

  getRecommendations(setId: number): void {
    this.songService.refreshRecommendations(setId).subscribe(
      (data: any[]) => {
        console.log('Recomendaciones frescas:', data);  // Asegúrate de que los datos sean diferentes
        this.recommendations = data;  // Asigna las nuevas recomendaciones
      },
      (error) => {
        console.error('Error al obtener recomendaciones:', error);
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

    onRefreshRecommendations(): void {
      const currentSetId = this.setsService.set.id_set;
  
      if (currentSetId) {
        // Volver a obtener las recomendaciones
        this.getRecommendations(currentSetId);
      } else {
        console.error('ID del set no encontrado para refrescar las recomendaciones');
      }
    }
    
}
