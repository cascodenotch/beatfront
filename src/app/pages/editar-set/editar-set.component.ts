import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editar-set',
  templateUrl: './editar-set.component.html',
  styleUrls: ['./editar-set.component.css']
})
export class EditarSetComponent {

  // Propiedades
  titulo: string = 'Mi primer set';
  showValidation = false;
  inputValue: string = '';

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

  // Métodos

  // Maneja el evento de guardar
  onSave() {
    this.showValidation = true;  // Mostrar el componente de validación
  }

  // Cierra el mensaje de validación
  closeValidation() {
    this.showValidation = false; 
  }

  // Maneja el evento de arrastrar y soltar
  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  // Maneja cambios en el valor del input
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value; 
  }
}