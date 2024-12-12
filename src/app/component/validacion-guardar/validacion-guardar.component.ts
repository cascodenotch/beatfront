import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-validacion-guardar',
  templateUrl: './validacion-guardar.component.html',
  styleUrls: ['./validacion-guardar.component.css']
})
export class ValidacionGuardarComponent {

  @Output() closeValidation = new EventEmitter<void>(); 

  close(){
    this.closeValidation.emit(); 
  }
  
}
