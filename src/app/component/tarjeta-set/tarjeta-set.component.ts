// tarjeta-set.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DjSet } from '../../models/dj-set';
import { Router } from '@angular/router';  // Importamos Router para redirigir
import { SetsService } from 'src/app/shared/sets.service';

@Component({
  selector: 'app-tarjeta-set',
  templateUrl: './tarjeta-set.component.html',
  styleUrls: ['./tarjeta-set.component.css']
})
export class TarjetaSetComponent {
  @Input() djset!: DjSet;
  @Output() deleteCard = new EventEmitter<DjSet>();  // Emite un evento cuando se elimina una tarjeta
  @Output() editCard = new EventEmitter<number>();  // Evento para la edición, emite el ID del set
  @Output() closeValidation = new EventEmitter<void>();

  selectedSetId: number = 0;

  constructor(private router: Router, private setsService: SetsService) {}

  onclickDel() {
    this.selectedSetId = this.djset.id_set; 
    console.log("Set ID: ", this.selectedSetId);
    this.deleteCard.emit(this.djset);  // Emitimos el evento de eliminación
    this.closeValidation.emit(); 
  }

  onclickEdit() {
    this.setsService.set = { ...this.djset }; 
    console.log("Set guardado para editar:", this.setsService.set);
    this.selectedSetId = this.djset.id_set; 
    console.log("Edit Set ID: ", this.selectedSetId);
    this.editCard.emit(this.selectedSetId);  // Emitimos el evento para editar
    this.router.navigate(['/editar-set', this.selectedSetId]);  // Navegar al componente de edición con el ID del set
  }
}

