import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-validacion-mover-cancion',
  templateUrl: './validacion-mover-cancion.component.html',
  styleUrls: ['./validacion-mover-cancion.component.css']
})
export class ValidacionMoverCancionComponent {

  @Output() closeValidation = new EventEmitter<void>(); 
  @Output() confirmValidation = new EventEmitter<void>();

  close(){
    this.closeValidation.emit(); 
  }

  confirm() {
    this.confirmValidation.emit();
  }
  
}
