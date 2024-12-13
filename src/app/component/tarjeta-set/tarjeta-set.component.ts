import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-set',
  templateUrl: './tarjeta-set.component.html',
  styleUrls: ['./tarjeta-set.component.css']
})
export class TarjetaSetComponent {
  @Input() searchText: string = ''; 
  showCard2 = true; 

  cards = [
    { title: 'Dance Revolution' },
    { title: 'Electro Beats' },
    { title: 'Groove Night' },
    { title: 'Bass in Motion' },
    { title: 'Rhythm Pulse' },
    { title: 'Club Fever' },
    { title: 'Funky Waves' },
    { title: 'Neon Vibes' },
    { title: 'Soundscape Journey' },
    { title: 'Rhythm Pulse' },
    { title: 'Club Fever' },
    { title: 'Funky Waves' },
    { title: 'Neon Vibes' },
    { title: 'Soundscape Journey' },
  ];
  

  showValidation = false; 

  onclickDel(card: any){
    this.showValidation = true; 
  }

  closeValidation(){
    this.showValidation = false; 
  }

  filteredCards = this.cards; 

  ngOnChanges(): void {
    this.filteredCards = this.cards.filter((card) => {
      const matchesSearchText = this.searchText
        ? card.title.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
  
      return matchesSearchText;
    });

    this.showCard2 = !this.searchText;
  }
}
