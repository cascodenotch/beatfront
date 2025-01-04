import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-validacion-log-out',
  templateUrl: './validacion-log-out.component.html',
  styleUrls: ['./validacion-log-out.component.css']
})
export class ValidacionLogOutComponent {
  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  // Emite el evento de confirmación
  confirm() {
    this.confirmEvent.emit();
  }

  // Emite el evento de cancelación
  close() {
    this.cancelEvent.emit();
  }
}
