import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-validacion-anadir',
  templateUrl: './validacion-anadir.component.html',
  styleUrls: ['./validacion-anadir.component.css']
})
export class ValidacionAnadirComponent {
  @Output() closeValidation = new EventEmitter<void>(); 

  close(){
    this.closeValidation.emit(); 
  }
  
}
