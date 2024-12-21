import { Component, Input, Output } from '@angular/core';
import { SetsService } from 'src/app/shared/sets.service';
import { Response } from 'src/app/models/response';
import { Song } from 'src/app/models/song';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarjeta-cancion-set',
  templateUrl: './tarjeta-cancion-set.component.html',
  styleUrls: ['./tarjeta-cancion-set.component.css']
})
export class TarjetaCancionSetComponent {

  @Input() song!: Song;  // Recibimos el objeto song
  @Input() searchText: string = ''; 

  @Output() cerrarTarjeta = new EventEmitter<Song>();

    // Propiedades
    showValidation = false;

    constructor(public setService: SetsService){}

    // Método para mostrar el mensaje de validación
    onDelete() {
      this.showValidation = true;  
    }
  
    // Métodods para los botones del mensaje de validación 
    closeValidation(){
      this.showValidation = false; 
    }
  
    confirmDelete (song : Song){
      this.showValidation = false; 
      this.cerrarTarjeta.emit(this.song);
      console.log('Eliminar tarjeta:', song);
    }

}
