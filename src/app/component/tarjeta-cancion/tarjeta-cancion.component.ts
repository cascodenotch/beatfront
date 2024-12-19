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
  @Input() song!: Song;  
  @Input() searchText: string = ''; 
  @Input() danceability: string = ''; 
  @Input() energy: string = ''; 
  @Input() key: string = ''; 
  @Input() tempo: string = ''; 
  selectedSongId: string = ""; 

  onclickAdd(card: any) {
    this.selectedSongId = this.song.songId; 
    console.log("Song ID: ", this.selectedSongId);
    this.addSongToSet.emit(this.selectedSongId);
    this.closeValidation.emit(); 
  }
}

