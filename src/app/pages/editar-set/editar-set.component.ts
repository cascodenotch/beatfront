import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editar-set',
  templateUrl: './editar-set.component.html',
  styleUrls: ['./editar-set.component.css']
})
export class EditarSetComponent {

  showValidation = false;

  // Método para mostrar el mensaje de validación
  onSave() {
      this.showValidation = true;  // Mostrar el componente de validación
  }

  closeValidation(){
    this.showValidation = false; 
  }

  titulo: string = 'Mi primer set';
  
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
    },
    {
      title: 'Levitating',
      author: 'Dua Lipa',
      danceability: 0.80,
      energy: 0.78,
      key: 'B',
      tempo: 103,
      duration: 3.23,
      img: '../../../assets/Img/caratula cancion.png'
    }
  ];

  // Método para manejar el evento de arrastrar y soltar
  onDrop(event: CdkDragDrop<any[]>) {
    // Cambiar el orden de las tarjetas en el arreglo
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

}
