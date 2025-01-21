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
  songs: any[] = [];  // Arreglo de canciones que se muestran
  allSongs: any[] = []; // Copia original de todas las canciones
  selectedSongId: string = "";
  showValidation = false; // Controla si se muestra el modal
  spotifyUrl: string | null = null;
  djSet = new DjSet(0, 0, '', '', [], '');
  isLoading: boolean = true;

  constructor(private songService: SongsService, private setsService: SetsService, private router: Router) {}

  ngOnInit(): void {
    const token = this.songService.tokenUser;
    this.djSet = this.setsService.set;
    const currentSetId = this.djSet.id_set;

    if (token) {
      console.log("Token recibido en canciones:", token);
      this.fetchSongs(token, currentSetId);
    } else {
      console.error("Token no encontrado");
    }
  }

  fetchSongs(token: string, setId: number): void {
    this.songService.getTracks(token, setId, this.searchText, {}).subscribe(
      (data: any) => {
        console.log('Canciones obtenidas:', data);
        this.allSongs = [...data]; // Guardar copia original
        this.songs = [...data]; // Para mostrar en UI
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener canciones:', error);
      }
    );
  }

  onAddSongToSet(songId: string) {
    this.selectedSongId = songId;
    this.showValidation = true;
    console.log("Song ID recibido:", songId);
  }

  closeVal() {
    this.showValidation = false;
    console.log("Modal cerrado");
  }

  onConfirmAdd(songId: string) {
    console.log('Añadiendo canción con ID:', songId);
    this.confirmAddSongToSet(songId);
  }

  confirmAddSongToSet(songId: string): void {
    if (songId !== null) {
      this.djSet = this.setsService.set;
      const setId = this.djSet.id_set;
      this.setsService.addSongToSet(setId, songId).subscribe(
        response => {
          console.log('Canción añadida con éxito:', response);
          this.songs = this.songs.filter(song => song.songId !== songId);
          console.log('Canción eliminada de la lista');
          this.showValidation = false;
        },
        error => {
          console.error('Error al añadir la canción:', error);
        }
      );
    }
  }

  search(): void {
    const token = this.songService.tokenUser;
    const setId = this.djSet.id_set;

    if (token && setId) {
      this.fetchSongs(token, setId);
    } else {
      console.error("Token o setId no proporcionados");
    }
  }

  applyFilters(): void {
    const danceabilityFilter = this.danceability.trim().toLowerCase();
    const energyFilter = this.energy.trim().toLowerCase();
    const keyFilter = this.key.trim().toLowerCase();
    const tempoFilter = this.tempo.trim().toLowerCase();

    if (!danceabilityFilter && !energyFilter && !keyFilter && !tempoFilter) {
      this.songs = [...this.allSongs]; // Restaurar canciones originales
      return;
    }

    this.songs = this.allSongs.filter(song => {
      return (
        (!danceabilityFilter || (song.danceability && song.danceability.toString().toLowerCase().includes(danceabilityFilter))) &&
        (!energyFilter || (song.energy && song.energy.toString().toLowerCase().includes(energyFilter))) &&
        (!keyFilter || (song.key && song.key.toString().toLowerCase().includes(keyFilter))) &&
        (!tempoFilter || (song.tempo && song.tempo.toString().toLowerCase().includes(tempoFilter)))
      );
    });

    console.log('Canciones después del filtrado:', this.songs);
  }

  onPlaySong(songId: string) {
    console.log("Reproduciendo canción con ID: ", songId);

    this.songService.getSpotifyTrackUrl(songId).subscribe(
      (data: any) => {
        console.log('URL de la canción:', data.url);
        this.spotifyUrl = data.url + '?autoplay=true';
      },
      (error) => {
        console.error('Error al obtener la URL de la canción:', error);
      }
    );
  }
}
