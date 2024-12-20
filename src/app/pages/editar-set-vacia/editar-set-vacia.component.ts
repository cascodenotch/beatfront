import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SetsService } from 'src/app/shared/sets.service';
import { DjSet } from 'src/app/models/dj-set';
import { Response } from 'src/app/models/response';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { SongsService } from 'src/app/shared/songs.service';

@Component({
  selector: 'app-editar-set-vacia',
  templateUrl: './editar-set-vacia.component.html',
  styleUrls: ['./editar-set-vacia.component.css']
})
export class EditarSetVaciaComponent {
  token: string | null = null;
  inputValue: string = '';
  showArrow: boolean = true; 
  djSet = new DjSet(0, 0, '', '', []);

  constructor(private router: Router, 
    public setService: SetsService, 
    private route: ActivatedRoute,  
    private userService: UsersService, 
    private songService: SongsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token']; 
      console.log("Token recibido:", this.token);
  
      if (this.token) {
        // Guardar el token en el servicio para usarlo en otras partes de la app
        this.songService.setToken(this.token);  // Almacenar el token en el servicio SongsService

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
      } else {
        console.error("Token no recibido");
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

  onAddSongAndSet() {
   
    let set: DjSet = new DjSet (0, this.userService.user?.id_user, this.inputValue, "assets/Img/disc.jpeg", []);
    console.log(set);
    console.log(this.userService.user);
    this.setService.addSet(set).subscribe((response: Response)=>{
      this.setService.set.id_set= Number(response.id_set);
      this.setService.arraySets.push(set);
      if (this.inputValue) {
        this.router.navigate(['canciones']);
      }
    })
  }
}