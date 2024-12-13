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

  // cards = [
  //   { title: 'Blinding Lights', autor: 'The Weeknd', danceability: 8, energy: 7, key: 'F#m', tempo: '171', duracion: '3:20' },
  //   { title: 'Shape of You', autor: 'Ed Sheeran', danceability: 8, energy: 6, key: 'C#m', tempo: '96', duracion: '3:53' },
  //   { title: 'Levitating', autor: 'Dua Lipa', danceability: 9, energy: 8, key: 'Bm', tempo: '103', duracion: '3:23' },
  //   { title: 'Uptown Funk', autor: 'Mark Ronson ft. Bruno Mars', danceability: 8, energy: 9, key: 'Dm', tempo: '115', duracion: '4:30' },
  //   { title: 'Sunflower', autor: 'Post Malone & Swae Lee', danceability: 9, energy: 7, key: 'A', tempo: '90', duracion: '2:38' },
  //   { title: 'Happier Than Ever', autor: 'Billie Eilish', danceability: 5, energy: 6, key: 'E', tempo: '76', duracion: '4:58' },
  //   { title: 'Blinding Lights', autor: 'The Weeknd', danceability: 8, energy: 7, key: 'F#m', tempo: '171', duracion: '3:20' },
  //   { title: 'Shape of You', autor: 'Ed Sheeran', danceability: 8, energy: 6, key: 'C#m', tempo: '96', duracion: '3:53' },
  //   { title: 'Levitating', autor: 'Dua Lipa', danceability: 9, energy: 8, key: 'Bm', tempo: '103', duracion: '3:23' },
  //   { title: 'Uptown Funk', autor: 'Mark Ronson ft. Bruno Mars', danceability: 8, energy: 9, key: 'Dm', tempo: '115', duracion: '4:30' },
  //   { title: 'Sunflower', autor: 'Post Malone & Swae Lee', danceability: 9, energy: 7, key: 'A', tempo: '90', duracion: '2:38' },
  //   { title: 'Happier Than Ever', autor: 'Billie Eilish', danceability: 5, energy: 6, key: 'E', tempo: '76', duracion: '4:58' },
  // ];

  cards = [
    { title: 'Blinding Lights', autor: 'The Weeknd', danceability: 8, energy: 7, key: 'F#m', tempo: '171', duracion: '3:20' },
    { title: 'Shape of You', autor: 'Ed Sheeran', danceability: 8, energy: 6, key: 'C#m', tempo: '96', duracion: '3:53' },
    { title: 'Levitating', autor: 'Dua Lipa', danceability: 9, energy: 8, key: 'Bm', tempo: '103', duracion: '3:23' },
    { title: 'Uptown Funk', autor: 'Mark Ronson ft. Bruno Mars', danceability: 8, energy: 9, key: 'Dm', tempo: '115', duracion: '4:30' },
    { title: 'Sunflower', autor: 'Post Malone & Swae Lee', danceability: 9, energy: 7, key: 'A', tempo: '90', duracion: '2:38' },
    { title: 'Happier Than Ever', autor: 'Billie Eilish', danceability: 5, energy: 6, key: 'E', tempo: '76', duracion: '4:58' },
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
