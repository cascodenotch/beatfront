import { Component, OnInit } from '@angular/core';
import { SetsService } from '../../shared/sets.service';
import { UsersService } from 'src/app/shared/users.service';
import { DjSet } from '../../models/dj-set';

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

  constructor(private setsService: SetsService, private usersService: UsersService) {}

  ngOnInit(): void {
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
