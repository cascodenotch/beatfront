import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-validacion-eliminar',
  templateUrl: './validacion-eliminar.component.html',
  styleUrls: ['./validacion-eliminar.component.css']
})
export class ValidacionEliminarComponent {
  @Output() closeValidation = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<number>();
  @Input() setId: number = 0;

  close() {
    this.closeValidation.emit();
  }

  confirm() {
    this.confirmDelete.emit(this.setId);
    console.log('Set ID eliminado:', this.setId);
  }
}
