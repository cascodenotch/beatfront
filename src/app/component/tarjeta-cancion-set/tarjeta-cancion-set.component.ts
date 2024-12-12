import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-cancion-set',
  templateUrl: './tarjeta-cancion-set.component.html',
  styleUrls: ['./tarjeta-cancion-set.component.css']
})
export class TarjetaCancionSetComponent {

  @Input() card:any

    // Variable para controlar la visibilidad del mensaje de validación
    showValidation = false;

    // Método para mostrar el mensaje de validación
    onDelete(card:any) {
      console.log('Eliminar tarjeta:', card);
      this.showValidation = true;  
    }
  
    closeValidation(){
      this.showValidation = false; 
    }
  
}
