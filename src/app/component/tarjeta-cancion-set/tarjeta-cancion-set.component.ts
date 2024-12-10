import { Component } from '@angular/core';

@Component({
  selector: 'app-tarjeta-cancion-set',
  templateUrl: './tarjeta-cancion-set.component.html',
  styleUrls: ['./tarjeta-cancion-set.component.css']
})
export class TarjetaCancionSetComponent {

  cards = [
    { 
      title: 'Blinding Lights', 
      author: 'The Weeknd', 
      danceability: 0.51, 
      energy: 0.73, 
      key: 'C#', 
      tempo: 171, 
      duration: 3.20, 
      img: '../../../assets/Img/caratula cancion.png' 
    },
    { 
      title: 'Shape of You', 
      author: 'Ed Sheeran', 
      danceability: 0.65, 
      energy: 0.77, 
      key: 'D', 
      tempo: 96, 
      duration: 4.23, 
      img: '../../../assets/Img/caratula cancion.png' 
    },
    { 
      title: 'Bohemian Rhapsody', 
      author: 'Queen', 
      danceability: 0.39, 
      energy: 0.40, 
      key: 'E', 
      tempo: 144, 
      duration: 5.55, 
      img: '../../../assets/Img/caratula cancion.png' 
    }
  ];
  
    // Variable para controlar la visibilidad del mensaje de validación
    showValidation = false;

    // Método para mostrar el mensaje de validación
    onDelete(card: any) {
      this.showValidation = true;  // Mostrar el componente de validación
    }
  
}
