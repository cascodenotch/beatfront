import { Component } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {

  cards = [
    { title: 'Blinding Lights', autor: 'The Weeknd', danceability: 8, energy: 7, key: 'F#m', tempo: '171' },
    { title: 'Shape of You', autor: 'Ed Sheeran', danceability: 8, energy: 6, key: 'C#m', tempo: '96' },
    { title: 'Levitating', autor: 'Dua Lipa', danceability: 9, energy: 8, key: 'Bm', tempo: '103' },
  ];
}
