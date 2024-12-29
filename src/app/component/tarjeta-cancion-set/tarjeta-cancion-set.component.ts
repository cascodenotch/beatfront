import { Component, Input, Output } from '@angular/core';
import { SetsService } from 'src/app/shared/sets.service';
import { Response } from 'src/app/models/response';
import { Song } from 'src/app/models/song';
import { EventEmitter } from '@angular/core';
import { SongsService } from 'src/app/shared/songs.service';

@Component({
  selector: 'app-tarjeta-cancion-set',
  templateUrl: './tarjeta-cancion-set.component.html',
  styleUrls: ['./tarjeta-cancion-set.component.css']
})
export class TarjetaCancionSetComponent {

  @Input() song!: Song;  // Recibimos el objeto song
  @Input() searchText: string = ''; 

  @Output() cerrarTarjeta = new EventEmitter<Song>();
  @Output() playSong = new EventEmitter<string>();

    // Propiedades
    showValidation = false;
    selectedSongId: string = ""; 
    isPlaying = false; 
    spotifyUrl: string =""; 

    constructor(public setService: SetsService, public songService: SongsService){}

    onDelete() {
      this.showValidation = true;  
    }
  
    closeValidation(){
      this.showValidation = false; 
    }
  
    confirmDelete (song : Song){
      this.showValidation = false; 
      this.cerrarTarjeta.emit(this.song);
      console.log('Eliminar tarjeta:', song);
    }

    onclickPlay() {
      this.selectedSongId = this.song.songId; 
      this.isPlaying = true; 
      this.songService.getSpotifyTrackUrl(this.selectedSongId).subscribe(
        (data: any) => {
          console.log('URL de la canción:', data.url);
          this.spotifyUrl = data.url;
        },
        (error) => {
          console.error('Error al obtener la URL de la canción:', error);
        }
      );
    }

    closeModal() {
      this.isPlaying = false; // Cierra el modal
    }
    
}
