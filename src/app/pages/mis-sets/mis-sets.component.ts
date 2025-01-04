import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetsService } from '../../shared/sets.service';
import { UsersService } from 'src/app/shared/users.service';
import { DjSet } from '../../models/dj-set';
import { SongsService } from 'src/app/shared/songs.service';

@Component({
  selector: 'app-mis-sets',
  templateUrl: './mis-sets.component.html',
  styleUrls: ['./mis-sets.component.css']
})
export class MisSetsComponent implements OnInit {
  searchText: string = '';
  filteredCards: DjSet[] = [];
  allSets: DjSet[] = [];
  showValidation = false;
  selectedSetId: number = 0; // Cambiar a 'number'
  token: string | null = null;

  constructor(
    private setsService: SetsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private songService: SongsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || localStorage.getItem('token'); // Recupera el token
  
      if (this.token) {
        localStorage.setItem('token', this.token); // Guarda el token si viene de la URL
        this.songService.setToken(this.token); // Establece el token en el servicio SongsService
  
        // Obtener los datos del usuario usando el token
        this.usersService.putUser(this.token).subscribe(
          (response) => {
            if (response.error) {
              console.error(response.mensaje);
            } else {
              this.usersService.user = response.data;
              console.log("Datos del usuario obtenidos:", this.usersService.user);
  
              // Cargar los sets del usuario
              this.loadUserSets();
            }
          },
          (error) => {
            console.error("Error al obtener los datos del usuario:", error);
          }
        );
      } else {
        console.error("Token no disponible");
      }
    });
  }
  

  loadUserSets(): void {
    // Obtener el ID del usuario
    const currentUserId = this.usersService.getCurrentUserId();

    if (currentUserId !== null) {
      this.setsService.getSetsByUser(currentUserId).subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.allSets = response.sets;
            this.filteredCards = this.allSets;
          }
        },
        error: (err) => console.error('Error al cargar los sets:', err),
      });
    } else {
      console.error('El usuario no está logueado.');
    }
  }

  searchSets() {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredCards = this.allSets.filter(set =>
      set.titulo.toLowerCase().includes(searchTerm)
    );
  }

  openValidation(set: DjSet) {
    this.selectedSetId = set.id_set; // Solo pasamos el ID
    this.showValidation = true;
  }

  closeVal() {
    this.showValidation = false;
    this.selectedSetId = 0; // Asegurarse de que es un número
  }

  deleteSet(setId: number) {
    this.setsService.deleteSet(setId).subscribe({
      next: () => {
        console.log(`Set eliminado: ${setId}`);
        this.allSets = this.allSets.filter(set => set.id_set !== setId);
        this.filteredCards = this.filteredCards.filter(set => set.id_set !== setId);
        this.closeVal();
      },
      error: (err) => console.error('Error al eliminar el set:', err),
    });
  }
}
