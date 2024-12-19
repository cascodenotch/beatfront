import { Component, Input } from '@angular/core';
import { SetsService } from 'src/app/shared/sets.service';
import { Response } from 'src/app/models/response';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-tarjeta-cancion-set',
  templateUrl: './tarjeta-cancion-set.component.html',
  styleUrls: ['./tarjeta-cancion-set.component.css']
})
export class TarjetaCancionSetComponent {

  @Input() song!: Song;  // Recibimos el objeto song
  @Input() searchText: string = ''; 
  @Input() danceability: string = ''; 
  @Input() energy: string = ''; 
  @Input() key: string = ''; 
  @Input() tempo: string = ''; 

    // Propiedades
    showValidation = false;

    constructor(public setService: SetsService){}

    // Método para mostrar el mensaje de validación
    onDelete(song:Song) {
      console.log('Eliminar tarjeta:', song);
      this.showValidation = true;  
    }
  
    // Métodods para los botones del mensaje de validación 
    closeValidation(){
      this.showValidation = false; 
    }
  
    confirmDelete (song : Song){
      this.showValidation = false; 
      this.setService.deleteSongfromSet(song.songId, 64).subscribe(
            (response: Response) => {
              if (response.error) {
                console.error('Error al eliminar cancion:', response.mensaje);
              } else {
                console.log('Canción eliminada con éxito:', response.song?.songId);
              }
            },
            (error) => {
              console.error('Error en la solicitud HTTP:', error);
            }
          );
      
    }
}
