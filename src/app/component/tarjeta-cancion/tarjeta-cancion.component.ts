import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Song } from '../../models/song';

@Component({
  selector: 'app-tarjeta-cancion',
  templateUrl: './tarjeta-cancion.component.html',
  styleUrls: ['./tarjeta-cancion.component.css']
})
export class TarjetaCancionComponent {
  @Output() addSongToSet = new EventEmitter<string>();
  @Output() closeValidation = new EventEmitter<void>();
  @Output() playSong = new EventEmitter<string>();

  @Input() song!: Song;  
  @Input() searchText: string = ''; 
  selectedSongId: string = ""; 

  onclickAdd(card: any) {
    this.selectedSongId = this.song.songId; 
    console.log("Song ID: ", this.selectedSongId);
    this.addSongToSet.emit(this.selectedSongId);
    this.closeValidation.emit(); 
  }

  onclickPlay() {
    this.selectedSongId = this.song.songId;  // Obtener el ID de la canción
    console.log("Reproduciendo canción con ID: ", this.selectedSongId);
    this.playSong.emit(this.selectedSongId);  // Emitir evento para reproducir la canción
  }
  
}

