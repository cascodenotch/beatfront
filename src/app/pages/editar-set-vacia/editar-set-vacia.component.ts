import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-set-vacia',
  templateUrl: './editar-set-vacia.component.html',
  styleUrls: ['./editar-set-vacia.component.css']
})
export class EditarSetVaciaComponent {

  inputValue: string = '';
  showArrow: boolean = true; 

  constructor(private router: Router) {}

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value; 
  }

  onInputFocus(): void {
    this.showArrow = false; 
  }

  navigateToSongs() {
    if (this.inputValue) {
      this.router.navigate(['canciones']);
    }
}
}
