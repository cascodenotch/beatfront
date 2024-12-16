import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SetsService } from 'src/app/shared/sets.service';
import { Set } from 'src/app/models/set';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-editar-set-vacia',
  templateUrl: './editar-set-vacia.component.html',
  styleUrls: ['./editar-set-vacia.component.css']
})
export class EditarSetVaciaComponent {

  inputValue: string = '';
  showArrow: boolean = true; 
  public set : Set = {id_set:0, id_user:0, titulo:"", imagen:"", songs:[]};

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

    this.setService.addSet(this.set).subscribe(()=>{
      console.log("ok");
    })
  }
}
