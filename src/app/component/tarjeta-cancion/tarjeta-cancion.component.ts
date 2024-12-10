import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-cancion',
  templateUrl: './tarjeta-cancion.component.html',
  styleUrls: ['./tarjeta-cancion.component.css']
})
export class TarjetaCancionComponent {
  @Input() searchText: string = ''; 
  @Input() danceability: string = ''; 
  @Input() energy: string = ''; 
  @Input() key: string = ''; 
  @Input() tempo: string = ''; 

  cards = [
    { title: 'Título 1', autor: 'Autor 1', danceability: 7, energy: 8, key: 'C#', tempo: '120' },
    { title: 'Título 2', autor: 'Autor 2', danceability: 6, energy: 7, key: 'D', tempo: '120' },
    { title: 'Título 3', autor: 'Autor 3', danceability: 8, energy: 9, key: 'E', tempo: '140' },
    { title: 'Título 4', autor: 'Autor 4', danceability: 5, energy: 6, key: 'F#', tempo: '100' },
    { title: 'Título 1', autor: 'Autor 1', danceability: 7, energy: 8, key: 'C#', tempo: '120' },
    { title: 'Título 2', autor: 'Autor 2', danceability: 6, energy: 7, key: 'D', tempo: '110' },
    { title: 'Título 3', autor: 'Autor 3', danceability: 8, energy: 9, key: 'E', tempo: '140' },
    { title: 'Título 4', autor: 'Autor 4', danceability: 5, energy: 6, key: 'F#', tempo: '100' },
    { title: 'Título 1', autor: 'Autor 1', danceability: 7, energy: 8, key: 'C#', tempo: '120' },
    { title: 'Título 2', autor: 'Autor 2', danceability: 6, energy: 7, key: 'D', tempo: '110' },
    { title: 'Título 3', autor: 'Autor 3', danceability: 8, energy: 9, key: 'E', tempo: '120' },
    { title: 'Título 4', autor: 'Autor 4', danceability: 5, energy: 6, key: 'F#', tempo: '100' },
  ];

  filteredCards = this.cards; 

  
  ngOnChanges(): void {
    this.filteredCards = this.cards.filter((card) => {
      const matchesSearchText = this.searchText ? card.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          card.autor.toLowerCase().includes(this.searchText.toLowerCase()) : true;

      const matchesDanceability = this.danceability ? card.danceability === parseInt(this.danceability, 10) : true;

      const matchesEnergy = this.energy ? card.energy === parseInt(this.energy, 10) : true;

      const matchesKey = this.key ? card.key.toLowerCase() === this.key.toLowerCase() : true;

      const matchesTempo = this.tempo ? card.tempo.toLowerCase() === this.tempo.toLowerCase(): true;

      return matchesSearchText && matchesDanceability && matchesEnergy && matchesKey && matchesTempo;
    });
  }
}
