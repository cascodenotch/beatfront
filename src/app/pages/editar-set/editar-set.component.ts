import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editar-set',
  templateUrl: './editar-set.component.html',
  styleUrls: ['./editar-set.component.css']
})
export class EditarSetComponent {

  // Propiedades
  title: string = 'prueba';
  previousTitle: string = this.title;
  inputValue: string = '';
  showTitleValidation = false;
  showMoveValidation = false; 
  previousCardsState: any[] = [];
  previousIndex: number = 0;
  currentIndex: number = 0;

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
      title: 'Uptown Funk', 
      author: 'Mark Ronson ft. Bruno Mars', 
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

  // Maneja el evento de arrastrar y soltar
  onDrop(event: CdkDragDrop<any[]>) {
    this.previousCardsState = [...this.cards];
    this.previousIndex = event.previousIndex;
    this.currentIndex = event.currentIndex;
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    this.showMoveValidation = true;
  }

  // Maneja la desaparicion del fake placeholder
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value; 
  }

  // Maneja el evento `blur` para la validación
  onInputBlur(): void {
  if (this.inputValue !== this.previousTitle) {
    this.showTitleValidation = true; // Mostrar mensaje si hay cambios
  } else {
    this.showTitleValidation = false; // Ocultar mensaje si no hay cambios
  }
  }

  // Confirma los mensajes de validación 
  confirmMoveValidation (){
    this.showTitleValidation = false; 
    this.showMoveValidation = false;
    }
  
  confirmTitleValidation (){
    this.title = this.inputValue;
    this.previousTitle = this.inputValue;
    this.showTitleValidation = false; 
    }
  
  // Cierra los mensajes de validación
  closeMoveValidation() {
    this.cards = [...this.previousCardsState];
    this.showMoveValidation = false; 
    }
  
  closeTitleValidation() {
    this.inputValue = this.previousTitle;
    this.showTitleValidation = false; 
    }

}