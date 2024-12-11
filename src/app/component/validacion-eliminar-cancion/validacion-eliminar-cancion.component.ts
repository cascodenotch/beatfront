import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-validacion-eliminar-cancion',
  templateUrl: './validacion-eliminar-cancion.component.html',
  styleUrls: ['./validacion-eliminar-cancion.component.css']
})
export class ValidacionEliminarCancionComponent {

  @Output() closeValidation = new EventEmitter<void>(); 

  close(){
    this.closeValidation.emit(); 
  }

}
