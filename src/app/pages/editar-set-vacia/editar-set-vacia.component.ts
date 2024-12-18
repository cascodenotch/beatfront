import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SetsService } from 'src/app/shared/sets.service';
import { DjSet } from 'src/app/models/dj-set';
import { Response } from 'src/app/models/response';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-editar-set-vacia',
  templateUrl: './editar-set-vacia.component.html',
  styleUrls: ['./editar-set-vacia.component.css']
})
export class EditarSetVaciaComponent {
  token: string | null = null;
  inputValue: string = '';
  showArrow: boolean = true; 
  

  constructor(private router: Router, public setService: SetsService, private route: ActivatedRoute,  private userService: UsersService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token']; 
      console.log("Token recibido:", this.token);
      if (this.token) {
        this.userService.putUser(this.token).subscribe(
          (response) => {
            if (response.error) {
              console.error(response.mensaje);
            } else {
              this.userService.user = response.data;
              console.log("Datos del usuario obtenidos:", this.userService.user);
            }
          },
          (error) => {
            console.error("Error al obtener los datos del usuario:", error);
          }
        );
      }
    });
  }

  
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
    let set: DjSet = new DjSet (null, 1, this.inputValue, "assets/Img/disc.jpeg", []);
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
