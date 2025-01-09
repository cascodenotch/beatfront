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

  songs: any[] = [];  // Arreglo de canciones en el set actual
  selectedSongId: string = ""; // ID de la canción seleccionada
  showValidation = false; // Controla si se muestra el modal
  spotifyUrl: string | null = null; // URL de reproducción de Spotify
  djSet = new DjSet(0, 0, '', '', [], ''); // Instancia del set actual
  recommendations: any[] = []; // Almacena las canciones recomendadas
  isLoading: boolean = true;

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
    this.songService.getRecommendations(setId).subscribe(
      (data: any[]) => {
        console.log('Recomendaciones obtenidas:', data);
        this.recommendations = data; // Asigna las recomendaciones
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener recomendaciones:', error);
      }
    );
    this.isLoading = false;
  }

  onAddSongToSet(songId: string): void {
    this.selectedSongId = songId; // Asigna el ID de la canción seleccionada
    this.showValidation = true; // Muestra el modal de validación
    console.log("Song ID recibido:", songId);
  }

  closeVal(): void {
    this.showValidation = false; // Cierra el modal
    console.log("Modal cerrado");
  }

  onConfirmAdd(songId: string): void {
    console.log('Añadiendo canción con ID:', songId);
    this.confirmAddSongToSet(songId); // Llama a la función para añadir la canción al set
  }

  confirmAddSongToSet(songId: string): void {
    if (songId) {
      this.djSet = this.setsService.set;
      const setId = this.djSet.id_set;

      this.setsService.addSongToSet(setId, songId).subscribe(
        response => {
          console.log('Canción añadida con éxito:', response);

          // Elimina la canción de las recomendaciones
          this.recommendations = this.recommendations.filter(song => song.songId !== songId);

          this.showValidation = false; // Cierra el modal
        },
        error => {
          console.error('Error al añadir la canción:', error);
        }
      );
    }
  }

  onPlaySong(songId: string): void {
    console.log("Reproduciendo canción con ID:", songId);

    this.songService.getSpotifyTrackUrl(songId).subscribe(
      (data: any) => {
        console.log('URL de la canción:', data.url);

        // Agrega el parámetro autoplay=true para habilitar la reproducción automática
        this.spotifyUrl = `${data.url}?autoplay=true`;
      },
      (error) => {
        console.error('Error al obtener la URL de la canción:', error);
      }
    );
  }

  onRefreshRecommendations(): void {
    const currentSetId = this.setsService.set.id_set;

    if (currentSetId) {
      // Obtener nuevas recomendaciones
      this.getRecommendations(currentSetId);
    } else {
      console.error('ID del set no encontrado para refrescar las recomendaciones');
    }
  }
}
