import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DjSet } from '../../models/dj-set';
import { Router } from '@angular/router';  
import { SetsService } from 'src/app/shared/sets.service';

@Component({
  selector: 'app-tarjeta-set',
  templateUrl: './tarjeta-set.component.html',
  styleUrls: ['./tarjeta-set.component.css']
})
export class TarjetaSetComponent {
  @Input() djset!: DjSet;
  @Output() deleteCard = new EventEmitter<DjSet>();
  @Output() editCard = new EventEmitter<number>();
  @Output() closeValidation = new EventEmitter<void>();

  selectedSetId: number = 0;
  selectedListId: string = '';

  constructor(private router: Router, private setsService: SetsService) {}

  onclickDel() {
    this.selectedSetId = this.djset.id_set; 
    this.selectedListId = this.djset.id_playlist;
    this.deleteCard.emit(this.djset);
    this.closeValidation.emit(); 
  }

  onclickEdit() {
    this.setsService.set = { ...this.djset };
    this.selectedSetId = this.djset.id_set; 
    this.editCard.emit(this.selectedSetId);
    this.router.navigate(['/editar-set', this.selectedSetId]);
  }

  onclickPlay() {
    if (this.djset.id_playlist) {
      const spotifyUrl = `https://open.spotify.com/playlist/${this.djset.id_playlist}`;
      window.open(spotifyUrl, '_blank'); // Abrir en una nueva pestaña
    } else {
      console.error('No hay ID de playlist para este set');
    }
  }
}
