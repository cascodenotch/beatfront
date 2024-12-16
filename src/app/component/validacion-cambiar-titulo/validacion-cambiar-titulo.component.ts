import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-validacion-cambiar-titulo',
  templateUrl: './validacion-cambiar-titulo.component.html',
  styleUrls: ['./validacion-cambiar-titulo.component.css']
})
export class ValidacionCambiarTituloComponent {

  @Output() closeValidation = new EventEmitter<void>(); 
  @Output() confirmValidation = new EventEmitter<void>();

  close(){
    this.closeValidation.emit(); 
  }

  confirm() {
    this.confirmValidation.emit();
  }
  

}
