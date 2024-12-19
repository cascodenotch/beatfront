import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-validacion-anadir',
  templateUrl: './validacion-anadir.component.html',
  styleUrls: ['./validacion-anadir.component.css']
})
export class ValidacionAnadirComponent {
  @Output() closeValidation = new EventEmitter<void>(); 
  @Output() confirmAdd = new EventEmitter<string>(); 
  @Input() songId: string = ""; 

  close() {
    this.closeValidation.emit(); 
  }

  confirm() {
    this.confirmAdd.emit(this.songId);
    console.log(this.songId);
  }
}
