import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SetsService } from 'src/app/shared/sets.service';
import { DjSet } from 'src/app/models/dj-set';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-editar-set-vacia',
  templateUrl: './editar-set-vacia.component.html',
  styleUrls: ['./editar-set-vacia.component.css']
})
export class EditarSetVaciaComponent {

  inputValue: string = '';
  showArrow: boolean = true; 

  constructor(private router: Router, public setService: SetsService) {}

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

  addSet (){
    let set: DjSet = new DjSet (0, 1, this.inputValue, "assets/Img/disc.jpeg", []);
    this.setService.addSet(set).subscribe((response: Response)=>{
      set.id_set = Number(response.id_set);
      this.setService.arraySets.push(set);
      this.navigateToSongs();
    },
    (error) => {
      console.error('Error al añadir el set:', error);
    })
  }

  onAddSongAndSet() {
    this.addSet();
  }

}
