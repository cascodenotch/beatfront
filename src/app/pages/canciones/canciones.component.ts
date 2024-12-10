import { Component } from '@angular/core';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent {

  searchText: string = '';
  danceability: string = '';
  energy: string = '';
  key: string = '';
  tempo: string = '';
}
