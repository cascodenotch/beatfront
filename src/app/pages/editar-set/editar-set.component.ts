import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SetsService } from 'src/app/shared/sets.service';
import { DjSet } from 'src/app/models/dj-set';
import { Response } from 'src/app/models/response';
import { Song } from 'src/app/models/song';

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
  
  constructor(public setsService: SetsService){
    this.setsService.getSet(this.setsService.set.id_set).subscribe((response:Response)=>{
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

    this.setsService.getSetSongs(this.setsService.set.id_set).subscribe((response:Response)=>{
      console.log('Respuesta del servicio:', response);
      if (response.songs) {
        this.djSet.songs = response.songs;
      } else {
        console.error('No se encontraron canciones.');
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

  // Método para eliminar canción
  confirmDelete (song:Song){

    const updatedSongs = this.djSet.songs.filter(s => s.songId !== song.songId);
    const previousSongs = [...this.djSet.songs]; // Copia de seguridad para restaurar en caso de error
    this.djSet.songs = updatedSongs;

    this.setsService.deleteSongfromSet(song.songId, this.djSet.id_set).subscribe(
          (response: Response) => {
            if (response.error) {
              console.error('Error al eliminar cancion:', response.mensaje);
              this.djSet.songs = previousSongs; 
            } else {
              console.log('Canción eliminada con éxito');
            }
          },
          (error) => {
            console.error('Error en la solicitud HTTP:', error);
          }
        );
    
    }

    // ngOnInit(): void {
    //   const setId = 2;  // Deberías obtener el ID del set actual de alguna manera, tal vez de la URL
  
    //   // Cargar el set con las canciones
    //   this.setsService.getSet(setId).subscribe(
    //     (response: any) => {
    //       if (response.set) {
    //         this.djSet = response.set;
    //       } else {
    //         console.error('No se encontró el set');
    //       }
    //     },
    //     (error) => {
    //       console.error('Error al cargar el set:', error);
    //     }
    //   );
    // }

}