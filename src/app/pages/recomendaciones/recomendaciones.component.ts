import { Component } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {

  cards = [
    { title: 'Título 1', autor: 'Autor 1', danceability: 7, energy: 8, key: 'C#', tempo: '120' },
    { title: 'Título 2', autor: 'Autor 2', danceability: 6, energy: 7, key: 'D', tempo: '120' },
    { title: 'Título 3', autor: 'Autor 3', danceability: 8, energy: 9, key: 'E', tempo: '140' }
  ];
}
