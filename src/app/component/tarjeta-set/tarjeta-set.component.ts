import { Component } from '@angular/core';

@Component({
  selector: 'app-tarjeta-set',
  templateUrl: './tarjeta-set.component.html',
  styleUrls: ['./tarjeta-set.component.css']
})
export class TarjetaSetComponent {
  cards = [
    { title: 'Título Set 1' },
    { title: 'Título Set 2' },
    { title: 'Título Set 3' },
    { title: 'Título Set 4' },
    { title: 'Título Set 5' },
    { title: 'Título Set 6' },
    { title: 'Título Set 7' },
    { title: 'Título Set 8' },
    { title: 'Título Set 9' },
  ];
}
