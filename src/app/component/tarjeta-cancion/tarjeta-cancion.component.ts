import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';

@Component({
  selector: 'app-tarjeta-cancion',
  templateUrl: './tarjeta-cancion.component.html',
  styleUrls: ['./tarjeta-cancion.component.css']
})
export class TarjetaCancionComponent {
  @Input() song!: Song;  // Recibimos el objeto song
  @Input() searchText: string = ''; 
  @Input() danceability: string = ''; 
  @Input() energy: string = ''; 
  @Input() key: string = ''; 
  @Input() tempo: string = ''; 

  showValidation = false;

  onclickDel(card: any) {
    this.showValidation = true; 
  }

  closeValidation() {
    this.showValidation = false; 
  }
}
