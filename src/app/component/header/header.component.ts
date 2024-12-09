import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public logueado: boolean = false; 
  public desplegable: boolean = false;

  constructor (){
  }

  mostrarDesplegable(){
    this.desplegable = !this.desplegable; 
  }

}
