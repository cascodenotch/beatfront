import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SetsService } from 'src/app/shared/sets.service';
import { DjSet } from 'src/app/models/dj-set';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-editar-set',
  templateUrl: './editar-set.component.html',
  styleUrls: ['./editar-set.component.css']
})
export class EditarSetComponent {

  // Propiedades
  djSet = new DjSet(0, 0, '', '', []);
  title: string = '';
  previousTitle: string = '';
  inputValue: string = '';
  showTitleValidation = false;
  showMoveValidation = false; 
  previousCardsState: any[] = [];
  previousIndex: number = 0;
  currentIndex: number = 0;
  
  // cards = [
  //   { 
  //     title: 'Blinding Lights', 
  //     author: 'The Weeknd', 
  //     danceability: 0.51, 
  //     energy: 0.73, 
  //     key: 'C#', 
  //     tempo: 171, 
  //     duration: 3.20, 
  //     img: '../../../assets/Img/caratula cancion.png' 
  //   },
  //   { 
  //     title: 'Shape of You', 
  //     author: 'Ed Sheeran', 
  //     danceability: 0.65, 
  //     energy: 0.77, 
  //     key: 'D', 
  //     tempo: 96, 
  //     duration: 4.23, 
  //     img: '../../../assets/Img/caratula cancion.png' 
  //   },
  //   { 
  //     title: 'Uptown Funk', 
  //     author: 'Mark Ronson ft. Bruno Mars', 
  //     danceability: 0.39, 
  //     energy: 0.40, 
  //     key: 'E', 
  //     tempo: 144, 
  //     duration: 5.55, 
  //     img: '../../../assets/Img/caratula cancion.png' 
  //   },
  //   {
  //     title: 'Levitating',
  //     author: 'Dua Lipa',
  //     danceability: 0.80,
  //     energy: 0.78,
  //     key: 'B',
  //     tempo: 103,
  //     duration: 3.23,
  //     img: '../../../assets/Img/caratula cancion.png'
  //   }
  // ];
  

  constructor(public setsService: SetsService){
    this.setsService.getSet(2).subscribe((response:Response)=>{
      console.log('Respuesta del servicio:', response);
      if (response.set) {
        this.djSet = response.set;
        console.log('Set recibido:', this.djSet);
        this.title = this.djSet.titulo;  
        this.previousTitle = this.title;
        this.inputValue = this.title;
        console.log('Título recibido:', this.title); 
      } else {
        console.error('No se encontró el set.');
      }
    })
  }

  // Maneja el evento de arrastrar y soltar
  onDrop(event: CdkDragDrop<any[]>) {
    this.previousCardsState = [...this.djSet.songs];
    this.previousIndex = event.previousIndex;
    this.currentIndex = event.currentIndex;
    moveItemInArray(this.djSet.songs, event.previousIndex, event.currentIndex);
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

    this.setsService.changeTitle(this.djSet.id_set, this.title).subscribe(
      (response: Response) => {
        if (response.error) {
          console.error('Error al cambiar el título:', response.mensaje);
        } else {
          console.log('Título cambiado con éxito:', response.djset_title);
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );

    }
  
  // Cierra los mensajes de validación
  closeMoveValidation() {
    this.djSet.songs = [...this.previousCardsState];
    this.showMoveValidation = false; 
    }
  
  closeTitleValidation() {
    this.inputValue = this.previousTitle;
    this.showTitleValidation = false; 
    }

}