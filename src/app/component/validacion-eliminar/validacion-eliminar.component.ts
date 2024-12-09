import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-validacion-eliminar',
  templateUrl: './validacion-eliminar.component.html',
  styleUrls: ['./validacion-eliminar.component.css']
})
export class ValidacionEliminarComponent {

  @Output() closeValidation = new EventEmitter<void>(); 

  close(){
    this.closeValidation.emit(); 
  }
  
}
