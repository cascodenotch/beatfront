import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-set-vacia',
  templateUrl: './editar-set-vacia.component.html',
  styleUrls: ['./editar-set-vacia.component.css']
})
export class EditarSetVaciaComponent {

  inputValue: string = '';
  showAlert: boolean = false; 

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value; 
  }

  onAddSongClick() {
    if (!this.inputValue) {
      this.showAlert = true; 
    } else {
      this.showAlert = false; 
    }
  }
}
